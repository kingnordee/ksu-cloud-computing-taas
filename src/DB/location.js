// JavaScript File
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'database-2.cazzxxgkw8xq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'C0,mpu7!n6',
    database: 'taas'
});

// connection.connect(function(err) {
//      if (err) {
//          console.error('Database connection failed: ' + err.stack);
//          return;
//      }
//  console.log('Connected to database');
//  });

connection.connect(function(err) {
  if (err) throw err;
  connection.query("DESCRIBE location;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

//each query will be its own function, and we will need to have it as a call; it will be as follow:
//connection will be the main file, each of the queries we need will be their own protocol
//in the main, they will call on each individual protocol as needed