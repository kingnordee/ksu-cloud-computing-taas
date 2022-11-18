var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'database-2.cazzxxgkw8xq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'C0,mpu7!n6',
    database: 'taas'
});

var cost = "SELECT cost FROM service WHERE type = 'Walking'";








connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(cost, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
  connection.on('error', function() {});
});








//Create the 

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("SELECT long, lat FROM location WHERE " + SurrogateKey + "ALTER TABLE location FROM service" + SurrogateKey + "" WHERE type = 'Walking'", function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
//   });
//   con.on('error', function() {});
// });