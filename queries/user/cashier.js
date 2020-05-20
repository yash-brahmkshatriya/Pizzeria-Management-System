exports.getCashierDetails = function(callback){
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
    var myquery = "SELECT * FROM cashier";
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