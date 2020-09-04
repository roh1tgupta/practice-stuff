var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'nodedb'
	});
	
con.connect((err) => {
	if (err) throw err;
	console.log("connected");
	var sql = "create table usercred (userid varchar(255), password varchar(255), age TINYINT unsigned, name varchar(255), address varchar(255), occupation varchar(255))";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Table Created');
		});
		
	var sql = "ALTER TABLE usercred ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Table Created');
		});
	
	});