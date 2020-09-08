var http=require("http");
var fs=require("fs");
var url=require("url");

var adr="http://localhost:8080/default.htm?year=2017&month=february";
var q=url.parse(adr,true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

console.log(q.query.month);

http.createServer(function(req,res) {
	var q=url.parse(req.url,true);
	var filename="./nodejs"+q.pathname;
	fs.readFile(filename,function(err,data) {
		res.writeHead(404,{"Content-Type":"text/html"});
		if (err) {
			return res.end("404 page not found");
		}
		res.write(data);
		res.end();
	});
}).listen(8080);