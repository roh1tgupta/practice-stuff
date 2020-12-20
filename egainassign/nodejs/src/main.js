const http = require('http');
const url = require('url');
const { getCompleteProductInfo } = require('./productInfo');
const { validateHeader } = require('./validateHeader');

const getHeaders = () => ({ 'Content-Type': 'application/json' });

// creating server on port 7999
http.createServer(function (req, res) {

  // parsing query param
  let q = url.parse(req.url, true);

  // getting productinfo and sending response
  const getProductInfo = () => {
    getCompleteProductInfo(q.query.productName).then(output => {
      if (output.productInfo) {
        res.writeHead(200, getHeaders()).end(JSON.stringify(output));
      } else {
        res.writeHead(204, getHeaders()).end();
      }
    }).catch(resp => {
      res.writeHead(500, getHeaders()).end(JSON.stringify(resp));
    });
  }

  if (q.pathname === '/search' && q.query.productName) {
    // for validating the headers
    validateHeader(req, res, getProductInfo); 
  } else if (q.pathname === '/search') {
    res.writeHead(400).end('missing or invalid query parameter');
  } else {
    res.writeHead(501).end();  
  }
}).listen(7999);
