var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mysql',
	database: 'nodedb'
	});
	
con.connect((err) => {
	if (err) throw err;
	console.log("connected");
	var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('rows affected', result.affectedRows);
		});
		
	var sql = "insert into customers (name, address) values ?";
	var values = [
		['John', 'Highway 71'],
		['Peter', 'Lowstreet 4'],
		['Amy', 'Apple st 652'],
		['Hannah', 'Mountain 21'],
		['Michael', 'Valley 345'],
		['Sandy', 'Ocean blvd 2'],
		['Betty', 'Green Grass 1'],
		['Richard', 'Sky st 331'],
		['Susan', 'One way 98'],
		['Vicky', 'Yellow Garden 2'],
		['Ben', 'Park Lane 38'],
		['William', 'Central st 954'],
		['Chuck', 'Main Road 989'],
		['Viola', 'Sideway 1633']
	];
	
	con.query(sql, [values], (err, result) => {
		if (err) throw err;
		console.log('result object', result);
		console.log('number of records inserted', result.affectedRows);
		});
	
	var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted, ID: " + result.insertId);
	});
});