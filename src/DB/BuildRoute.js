var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'database-2.cazzxxgkw8xq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'C0,mpu7!n6',
    database: 'taas'
});

// var sql1 = CREATE TABLE route( RouteID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, SessionID INT NOT NULL, ModeOfTransportation VARCHAR(255) NOT NULL, Distance VARCHAR(255) NOT NULL,
// var sql2 = Cost VARCHAR(255) NOT NULL, Duration VARCHAR(255) NOT NULL, OriginLngLat VARCHAR(255) NOT NULL, DestinationLngLat VARCHAR(255) NOT NULL, WayPoints VARCHAR(255) NULLABLE,
// var sql3 = FOREIGN KEY (SessionID) REFERENCES session(SessionID) );
// var sql = sql1 + sql2 + sql3

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(`CREATE TABLE route( 
                RoutID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                SessionID INT UNSIGNED NOT NULL,
            	ModeOfTransportation VARCHAR(255) NOT NULL,
            	Distance VARCHAR(255) NOT NULL,
            	Cost VARCHAR(255) NOT NULL,
            	Duration VARCHAR(255) NOT NULL,
            	OriginLngLat VARCHAR(255) NOT NULL, 
                DestinationLngLat VARCHAR(255) NOT NULL,
            	WayPoints VARCHAR(255) NULL,
            	FOREIGN KEY (SessionID) REFERENCES session(SessionID)
            );`, function (err, results, fields) {
    if (err) throw err;
    console.log(JSON.stringify(results));
    console.log("Results: ", results);
  });
  con.on('error', function() {});
  con.end(function(err) {});
});