var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
// var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// var upload = multer({ dest: './uploads' });

app.get('/hello.html', function (req, res) {
   res.sendFile( __dirname + "/" + "hello.html" );
})

app.post('/file_upload', function (req, res) {
   var file = __dirname + "/abcd" ;//+ req.files.file.name;
   console.log(req);
   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( "rohit"+err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
})