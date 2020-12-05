var http = require('http');
var url = require('url');
const { getCompleteProductInfo } = require('./productInfo');

const getHeaders = () => ({ 'Content-Type': 'application/json' });
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  // console.log(req.url);

  if (q.pathname === '/search' && q.query.productName) {
    getCompleteProductInfo(q.query.productName).then(output => {
      // console.log(output);
      if (output.productInfo) {
        res.writeHead(200, getHeaders()).end(JSON.stringify(output));
      } else {
        res.writeHead(204, getHeaders()).end();
      }
    }).catch(resp => {
      // console.log(resp);
      res.writeHead(500, getHeaders()).end(JSON.stringify(resp));
    });
  } else if (q.pathname === '/search') {
    res.writeHead(400).end('missing query parameter');
  } else {
    res.writeHead(501).end();
  }
}).listen(8080);