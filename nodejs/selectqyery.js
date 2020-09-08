var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
 console.log("count");
  con.query("SELECT * FROM randominfo limit 5", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
/*  
  con.query("SELECT name, address FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log("result---",result);
	console.log("result[1].address---",result[1].address);
	console.log("fields--",fields);
  });
  */
});