module.exports.validateHeader = (req, res, next) => {  
  if (!req.headers.accept || req.headers.accept.toLowerCase() !== 'application/json') {
    // invalid accept header
    res.writeHead(400).end('missing or invalid accept header');
  } else if (!req.headers['accept-language'] || req.headers['accept-language'].toLowerCase() !== 'en-us') {
    // invalid accept-language header
    res.writeHead(400).end('missing or invalid accept-language header');
  }
  next();
}