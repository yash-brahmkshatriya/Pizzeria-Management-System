exports.login = function(email_id,pwd,callback){
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
    var myquery = "SELECT * FROM `admin` WHERE emailid='" +email_id+"'AND pwd ='"+pwd+"'";
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Query failed')
            return callback(false)
        } else {
            return callback(result);
        }
    })
}