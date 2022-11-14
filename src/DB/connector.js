// JavaScript File
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'database-2.cazzxxgkw8xq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'C0,mpu7!n6',
    database: 'taas'
});

connection.connect(function(err) {
     if (err) {
         console.error('Database connection failed: ' + err.stack);
         return;
     }
 console.log('Connected to database');
 });

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("USE taas;", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

