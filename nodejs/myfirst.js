var http=require('http');//buildin module
var md=require('./firstModule'); //my created module
var url=require('url');//buildin module

http.createServer(function(req,res){
res.writeHead(200,{'content-type':'text/html'}); //status code 200 means all is ok
var splitUrl=url.parse(req.url,true).query;
var text=splitUrl.year + " " + splitUrl.month;
res.write("today date is " + md.dateTime().toLocaleString() +" and url is "+req.url + " and spliting url results in "+text);

res.end('\nhello rohit! this is your first program!!');
}).listen(8080);

console.log( __filename );
console.log( __dirname );
// with format specifiers
console.log('file name is %s :-', __filename);
console.log('directory name is %s :-', __dirname);

//using console.warn();
console.warn("this is warning");

//using console.error();
console.error(new Error('Hell! This is a wrong method.'));
