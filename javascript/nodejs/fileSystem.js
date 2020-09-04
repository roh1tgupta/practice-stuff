var http=require('http');
var fs=require('fs');  //including file System module

http.createServer(function(req,res){
	fs.readFile('./nodejs/hello2.html',function(err,data){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		//res.end();
		if(err) {
			console.log("error in readfile");
			res.write(" error"+err);
		}	
	});

	var abcd="cybage";
	fs.appendFile("./nodejs/rohit.txt",abcd,function(err){
		if (err) {
			console.log("error in APPENDFILE");
			res.write("  error of appendfile = "+err);
			throw err;
		}
		console.log("saved");
	});

	var hel="<html><body><h1>hello rohit</h1></body></html>"
	fs.writeFile("./nodejs/hello.html",hel,function(err){
		if (err) {
			console.log("error in writefile html");
			throw err;
		}
		console.log("replaced");
	});

	fs.rename("./nodejs/hello.html","./uploads/hello2.html",function(err){
		if (err) {
			console.log("error in rename");
			throw err;
		}
		console.log("renamed");
	});
}).listen(8080);
