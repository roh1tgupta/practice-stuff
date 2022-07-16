var express = require('express');
var app = express();
var http = require('http');
app.get('/', function (req, res) {
  console.log("requs receined ...")
  const abc = (rr) => {
    setTimeout(() =>  {
      rr.write(`event: NEW_ORDER\n`);

      rr.write(`id: ${new Date()}\n`);
      rr.write(`data: "deta is data2"\n\n`);

      abc(rr);
    }, 1000);
  };
  
  const headers = {
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    };
    res.writeHead(200, headers);

  abc(res); // This will serve your request to '/'.
  // res.write("NEW_ORDER", {"message": "hello wolld"});

});
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
 });
 