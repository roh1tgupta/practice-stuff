var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.id + " " + q.pass;
  console.log(txt);
  if(q.id === "rohit" && q.pass === "rohit")
  res.end("true");
	else
	res.end("false");
}).listen(8080);

