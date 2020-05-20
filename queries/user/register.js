exports.register = function(fname,lname,phn,emailid,pwd,callback){
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
    var myquery = "INSERT INTO `customer`(`fname`,`lname`,`phoneno`,`email_id`,`pwd`) VALUES ";
    var vals = "('"+fname+"','"+lname+"','"+phn+"','"+emailid+"','"+pwd+"')";
    myquery = myquery + vals;
    console.log(myquery)
    connection.query(myquery, (error,result) => {
        if(error){
            console.log('Query failed')
            return callback(false)
        } else {
            console.log('C Reg success')
            return callback(true);
        }
    })
}