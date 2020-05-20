exports.getOrderDetails = function(curr_order,callback){
    const mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sampleDB'
    });
    connection.connect(function(error,errconnect){
        if(!!error){
            console.log('Eror in Connecting to database');
            errconnect.release();
            return callback(false);
        } else {
            console.log('Database Connected');
        }
    });
    var myquery = "SELECT item_id,name,price FROM `menu` WHERE item_id in (";
    var items = "";
    var keys = Object.keys(curr_order);
    console.log('keys are',keys);
    for(i=0;i<keys.length-1;i++){
        items+=keys[i]+",";
    }
    items+=keys[keys.length-1];
    myquery=myquery+items+")";
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Item fetching failed')
            return callback(false)
        } else {
            console.log('Items fetched')
            return callback(result);
        }
    })
}

exports.updateDetails = function(order_details,cust_id,callback){
    const mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sampleDB'
    });
    connection.connect(function(error,errconnect){
        if(!!error){
            console.log('Eror in Connecting to database');
            errconnect.release();
            return callback(false);
        } else {
            console.log('Database Connected');
        }
    });
    var myquery = "INSERT INTO `orders`(`cust_id`,`order_date`) VALUES (" + cust_id+","+"(SELECT CURRENT_DATE from DUAL)"+")";
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Orders not updated')
            return callback(false)
        } else {
            console.log('Orders Updated');
            myquery = "INSERT INTO `bill`(`order_id`, `cid`, `amt`) VALUES ((SELECT COUNT(order_id) FROM orders),"+order_details["cashierid"]+","+order_details["totamt"]+")";
            connection.query(myquery, (error,result)=>{
                if(error) {
                    console.log("Bills not updated")
                    return callback(false)
                } else {
                    console.log("Bills updated");
                    for(i=0;i<order_details.length;i++){
                        console.log(order_details[i]);
                        myquery = "INSERT INTO `sold_items`(`order_id`, `item_id`, `qty`, `sold_at`) VALUES ((SELECT COUNT(order_id) FROM orders),"+order_details[i]["item_id"]+","+order_details[i]["qty"]+","+order_details[i]["price"]+")";
                        console.log(myquery);
                        connection.query(myquery, (error,result) => {
                            if(error){
                                console.log("Sold items not updated");
                                return callback(false);
                            } else {
                                console.log("Sold items updated");
                            }
                        })
                    }
                }
            })
        }
    })
    return callback(true);
}

