var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "mysql"
});
	//password: "root"
	//});
	
con.connect(function(err) {
	if (err) throw err;
	console.log("connected!");
	con.query("create database nodedb", (err, result) => {
		if (err) throw err;
		console.log("database created");
	});
});