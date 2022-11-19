var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'database-2.cazzxxgkw8xq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'C0,mpu7!n6',
    database: 'taas'
});

var sql = "CREATE TABLE session(    SessionID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  Origin VARCHAR(255) NOT NULL,  Destination VARCHAR(255) NOT NULL);"

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, results, fields) {
    if (err) throw err;
    console.log(JSON.stringify(results));
    console.log("Results: ", results);
  });
  con.on('error', function() {});
  con.end(function(err) {});
});