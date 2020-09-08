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
	var sql = "insert into randominfo (empid, name, location) values (100, 'ricky', 'abudhabi'), (99, 'flairy', 'pune'),(54, 'rohit', 'pune'), (40, 'bhalu', 'singapore'), (25, 'vikram', 'singapore'), (29, 'aisha', 'nyc'), (37, 'pit', 'miami'), (41, 'bull', 'losangeles'), (24, 'anil', 'mumbai'), (43, 'srh', 'mumbai'), (40, 'bhalu', 'singapore'), (25, 'vikram', 'singapore'), (29, 'aisha', 'nyc'), (37, 'pit', 'miami'), (41, 'bull', 'losangeles'), (24, 'anil', 'mumbai'), (43, 'srh', 'mumbai')";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
	});
});
