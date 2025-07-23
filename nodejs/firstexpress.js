var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/ab?cd/', (req, res) => {
   res.send('Matched /abbcd or /abcd/');
 });

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port   
   console.log("Example app listening at http://%s:%s", host, port)
})