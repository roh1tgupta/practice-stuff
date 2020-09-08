var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  
   /* //for deleting table
    var sql = "DROP TABLE abcd";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table deleted");
	});  */  
  
  var sql = "DROP TABLE IF EXISTS abcd";
	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  
  var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  con.query(sql, function (err, result) {
    if (err) throw err;
	console.log("update records");
    console.log(result.affectedRows + " record(s) updated");
  });
  
	var sql = "SELECT * FROM customers LIMIT 5";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("limit 5");
		console.log(result);
	});
	
	//"OFFSET 2", means starting from the third position, not the second!
	var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("limit 5 offset 2 means starting from 3rd");
		console.log(result);
	});
	
	//shorter syntax
	var sql = "SELECT * FROM customers LIMIT 2, 5";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("limit 5 offset 2 means starting from 3rd shorter syntax");
		console.log(result);
	});
  
});