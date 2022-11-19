var mysql = require('mysql');

var pool = mysql.createPool({
    // connectionLimit: 50,
    host: 'database-2.cazzxxgkw8xq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'C0,mpu7!n6',
    database: 'taas'
});

var sql = "SELECT cost FROM service WHERE type = 'Walking'";

pool.getConnection(function(err,connection) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(sql, function (err, results, fields) {
    if (err) throw err;
    console.log(JSON.stringify(results));
    console.log("Results: ", results);
  });
  pool.on('error', function() {});
  connection.release(function(err) {
    if (err) throw err;
  });
  pool.end(function(err) {
    if (err) throw err;
    console.log("Exit");
  });
});