// which header is used to detect wheather app is running on express
// By default, Express adds an X-Powered-By: Express header to responses.
// This header can be used to detect if the app is running on Express, though it is 
// not a reliable or recommended approach for security or production systems.
// You can disable this header using app.disable('x-powered-by').



// app.param('id', (req, res, next, id) => {console.log(param called); next();})
// app.get('user/:id', (req, res, next) => {console.log(routes matched); next();})
// app.get('user/:id', (req, res) => {console.log(another routes matched); res.end();})

// app.param('id', ...) middleware:
// This middleware is a special kind of middleware that is triggered whenever the id parameter in the 
// route is matched. The id parameter is passed as the last argument to the function.
// This middleware will run before any route handler for the id parameter.
// output will be 
// param called
// routes matched
// another route matched

// In Express.js, there are no built-in properties like req.alive, req.current, or req.live to 
// indicate the "liveness" or "freshness" of a request. However, req.fresh is a built-in property
//  that is commonly used. how it works below.
// Purpose: req.fresh is a boolean property in Express that checks whether the request is "fresh," 
// meaning whether the client’s cached version of the resource is still valid based on cache control headers.
// When it's true: It means the client's cached copy of the resource is up to date, so a revalidation with the server is not needed.
// When it's false: It means the client’s cached version is stale, and a new version of the resource needs to be fetched from the server.
// This property is typically used in combination with HTTP caching mechanisms, such as Last-Modified and ETag headers.

// In Express.js, the setting that indicates your app is behind a front-facing proxy is the trust proxy setting.
// trust proxy Setting:
// When your Express app is behind a proxy (e.g., Nginx, Apache, or a cloud load balancer like AWS ELB), 
// the IP address that Express sees in the req.ip and req.headers['x-forwarded-for'] headers might be that of 
// the proxy server, rather than the actual client making the request. The trust proxy setting helps Express 
// determine how it should trust the X-Forwarded-* headers, which are used by proxies to pass the original request details.
// By enabling trust proxy, Express will respect the X-Forwarded-For header and similar headers,
//  which contain the original client IP address and other details, like the protocol (HTTP or HTTPS), when the app is behind a proxy.

// In Express.js, when you use res.redirect([status, ]path), the default status code is 302 Found, if no status code is explicitly specified.
// Here are some common HTTP status codes used with res.redirect():

// 301 Moved Permanently: The resource has been permanently moved to a new URL.
// 302 Found (default): The resource has been temporarily moved to a new URL.
// 303 See Other: The response to the request can be found under a different URL, typically used after a POST request.
// 307 Temporary Redirect: The resource has been temporarily moved, and the client should use the same method for the new request.
// 308 Permanent Redirect: The resource has been permanently moved, and the client should use the new URL for all future requests.

// In Express.js, the correct method to assign an application setting is app.set(key, value).
const express = require('express');
const app = express();
// Set a custom setting
app.set('env', 'production');
// Access the setting
console.log(app.get('env'));  // Output: production

// When you call res.render(), it compiles the specified view template (like an EJS, Pug, or Handlebars template)
// and sends the resulting HTML to the client as the response.
// res.render('viewName', { data: someData }); // Renders and sends HTML to the client (Sends the rendered view to the client

// res.type() is used to set the Content-Type header of the response.
// The argument passed to res.type() should be a valid MIME type (or a shorthand)
// such as 'html', 'json', 'png', 'jpg', 'xml', etc.

// Error handling in Express.js can be done using middleware. You define an error-handling middleware
//  with four arguments: err, req, res, and next. This middleware is placed at the end of all 
// other middleware and route handlers to catch errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// You can serve static files like images, CSS files, and JavaScript files using the express.static() middleware.
// app.use(express.static('public')); // Serve files from the 'public' directory

// req.body: Contains data sent in the body of the request, typically for POST or PUT requests. 
// Requires the use of middleware like express.json() or express.urlencoded() to parse the body.
app.post('/user', (req, res) => {
  console.log(req.body.name); // Access POST data
});
// req.query: Contains the query string parameters in the URL. Useful for GET requests.
app.get('/user', (req, res) => {
  console.log(req.query.name); // Access query parameter
});
// req.params: Contains route parameters, defined using :param syntax in the route.
app.get('/user/:id', (req, res) => {
  console.log(req.params.id); // Access URL parameter
});
// express.json(): This middleware parses incoming requests with JSON payloads.
// It’s used for POST requests with a JSON body.
// express.urlencoded(): This middleware parses incoming requests with URL-encoded payloads (form data).
// It’s used for POST requests where data is sent in application/x-www-form-urlencoded format.

// You can enable CORS in Express.js by using the cors middleware.
// const cors = require('cors');
// app.use(cors()); // Allow all origins
// app.use(cors({
//   origin: 'https://example.com' // Allow only requests from a specific origin
// }));

// app.route(): This method is used to chain multiple HTTP methods for the same route, allowing for 
// more modular and organized code. It is particularly useful when you need to define different handlers 
// for different HTTP methods (GET, POST, etc.) on the same path.
app.route('/users')
  .get((req, res) => {
    res.send('GET request');
  })
  .post((req, res) => {
    res.send('POST request');
  })
  .put((req, res) => {
    res.send('PUT request');
  });
// app.all(): This method is used to define a route that handles all HTTP methods (GET, POST, PUT, DELETE, etc.)
//  for a given path. It's useful when you need to handle multiple HTTP methods for a single endpoint.
app.all('/users', (req, res) => {
  res.send('This will handle all HTTP methods for /users');
});
// res.sendFile(): Sends a file as a response. This is often used to send files (such as HTML, images, etc.)
// to the client.
// res.sendFile(path.join(__dirname, 'public', 'index.html'));
// app.all() is versatile and can be used when you want to apply the same logic for any HTTP method on a route.
// It is often used for common middleware, logging, or fallback behavior for multiple HTTP methods in one place.

// In Express, the + symbol in the route path /ab+cd/ is treated as a literal 
// plus sign. This means it matches exactly the string ab+cd/, including the plus
//  sign itself, not a pattern for one or more characters 
// (which is what + would typically mean in a regular expression).
app.get('/ab+cd/', (req, res) => {
  res.send('Matched /ab+cd only');
});

app.get('/ab?cd/', (req, res) => {
  res.send('Matched /abcd or /acd/');
});
// In this case, the ? allows for zero or one b character, which would 
// match both /abcd and /acd.


app.use("/api", (req, res, next) => {
  console.log(req.path); // latest
  next();
});
// The app.use("/api", ...) middleware applies to any request starting with /api.
// When the request is http://www.domainname.com/api/latest:
// The request URL is http://www.domainname.com/api/latest.
// The part after /api is /latest.
// So, req.path will be /latest because that’s the portion of the URL that comes after /api.


