exports.addAdmin = function(name,email_id,pwd,callback){
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
    var myquery = "INSERT INTO `admin`(`name`,`emailid`,`pwd`) VALUES ('"+name+"','"+email_id+"','"+pwd+"')";
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Query failed')
            return callback(false)
        } else {
            return callback(result);
        }
    })
}

exports.getAdmins = function(curr_admin_id,callback){
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
    var myquery = "SELECT admin_id,name FROM `admin` WHERE admin_id != "+curr_admin_id;
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Query failed')
            return callback(false)
        } else {
            return callback(result);
        }
    })
}


exports.removeAdmin = function(radmin_id,callback){
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
    var myquery = "DELETE FROM `admin` WHERE `admin_id` = "+radmin_id;
    console.log(myquery);
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Query failed')
            return callback(false)
        } else {
            return callback(result);
        }
    })
}
