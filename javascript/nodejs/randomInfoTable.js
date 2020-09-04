var mysql = require('mysql');

var con = mysql.createConnection({	
	host: 'localhost',
	user: 'root',
	password: 'mysql',
	database: 'nodedb'
});

con.connect( err => {
	if (err ) {
		throw err;
	}
	console.log("connected");
	var sql = 'create table randominfo (empid int unsigned, name varchar(125), location varchar(125))';
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Table Created');
	});

	var sql = 'Alter table randominfo add column id int auto_increment primary key';
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Table Created');
	});
}) 