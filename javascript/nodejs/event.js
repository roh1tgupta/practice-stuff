var fs=require('fs');
var rs=fs.createReadStream("./nodejs/hello.html");
rs.on("open",function(){
console.log('the file is open');
});


