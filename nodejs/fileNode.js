var fs = require('fs');  //including file System module

function abc() {
  // When you specify "utf8", you’re telling Node.js to 
  // interpret the file's contents as a string using the UTF-8 encoding.
  // fs.readFile("./nodejs/nodejs/rohit.txt", "utf-8",function (err, data) {

  //   console.log(data, "...data from 8")
  //   if (err) {
  //     console.log("error in readfile", err);
  //   }
  // });

  var abcd = "hello wolrd from 8th nov";
  // fs.appendFile("./nodejs/nodejs/rohit.txt", abcd, "utf-8", function (err, data) {
  //   if (err) {
  //     console.log("error in APPENDFILE", err);
  //     throw err;
  //   }
  //   console.log("saved, line # 20", data);  // data is undefined
  // });

  var hel = "<html><body><h1>hello rohit from 2Aug</h1></body></html>" + "/n"+ abcd
  // var hel = `<html><body><h1>hello rohit from 2Aug</h1></body></html>
  
  //     ${abcd}`
  // fs.writeFile("./nodejs/nodejs/hello.html", hel,
  //   "utf-8", //this doesnt make any diff, u can ommit this
  //   function (err, data) {
  //   if (err) {
  //     console.log("error in writefile html");
  //     throw err;
  //   }
  //   console.log("replaced", data);  // data is undefined
  // });

  // fs.rename("./nodejs/nodejs/hello.html","./uploads/hello2hello.html",function(err, data){    // this wont work as uploads folder is not created
  // fs.rename("./nodejs/nodejs/hello.html","./nodejs/nodejs/hello2hello.html",function(err, data){  // this would work
  // fs.rename("./nodejs/nodejs/hello.html","./nodejs/hello2hello.html",function(err, data){  // this would work
  // 	if (err) {
  // 		console.log("error in rename", err);
  // 		throw err;
  // 	}
  // 	console.log("renamed", data); // data is undefined
  // });


  // fs.readdir("./nodejs/nodejs", 
  //   "utf-8", // this makes no diff
  //   (err, data) => {
  //   if (err) {
  // 		console.log("error in rename", err);
  // 		throw err;
  // 	}
  // 	console.log("files", data); // name of the file in folder
  // })


  // fs.exists() is not there, it was deprecated in node v6
  // console.log(fs.existsSync('./nodejs/nodejs/nodejs'))

  fs.rmdir('./nodejs/nodejs/nodejs', (err, data) => {  // onlye remove empty directories  fs.rmdirSync() sync version
    if (err) { console.log(err, ".....line #67")} else {
      console.log('Directory deleted!   line# 68 ', data);  // data is undefined
    }
  });


// there is also promise version of rm available, that can be used when we are using promised and async await
  fs.rm('./nodejs/nodejs/nodejs', { recursive: true, force: false }, (err, data) => {  // fs.rmSync syn version
    if (err) { console.log(err, ".....line #69")} else {
      console.log('Directory deleted!   line# 70 ', data);  // data is undefined
    }
  });


  // fs.mkdir('./nodejs/nodejs/nodejs', (err, data) => {
  //   if (err) { console.log(err); throw err; }
  //   console.log('Directory created!    ', data);
  // });
  

}

async function abcWithSync() {

  try {
    // If you omit the utf8 encoding, Node.js will return the file data as a Buffer object. 
    // A Buffer is a raw binary representation of data, which is useful for dealing with 
    // binary data. It’s not directly human-readable like a string.
    // const ab = fs.readFileSync('./nodejs/nodejs/hello2.html', 'utf-8') // in human readabe string utf-8 formate
    const ab = fs.readFileSync('./nodejs/nodejs/hello2.html') // in binary format
    console.log(ab)
    console.log(ab.toString())

    var abcd = "\nhello wolrd from sync";
    const ab1 = fs.appendFileSync("./nodejs/nodejs/rohit.txt", abcd)
    console.log(ab1, "..line #60") // undefined

    var hel = "<html><body><h1>hello rohit from 2Aug async</h1></body></html>"
    const ab2 = fs.writeFileSync("./nodejs/nodejs/hello.html", hel)
    console.log(ab2, "..from line # 63") // undefined
  } catch (err) {
    console.log("....erroe....", err)
  }


  // fs.rename("./nodejs/hello.html","./uploads/hello2.html",function(err){
  // 	if (err) {
  // 		console.log("error in rename", err);
  // 		throw err;
  // 	}
  // 	console.log("renamed");
  // });


}

abc();
// abcWithSync();


// fs.readFileSync with try...catch:

// Synchronous Operation: fs.readFileSync performs file reading synchronously, 
// which means it blocks the execution of your code until the operation completes.
// Error Handling: Since fs.readFileSync is synchronous, you can't use a callback to 
// handle errors directly. Instead, you should use a try...catch block to handle exceptions. 
// If an error occurs (e.g., file not found, permission denied), fs.readFileSync will throw an 
// error, which can be caught and handled in the catch block.




// fs.readFile with a Callback:

// Asynchronous Operation: fs.readFile performs file reading asynchronously. This means that it does not block the execution of your code while the file is being read.
// Error Handling: With fs.readFile, you handle errors by checking the err parameter in the callback function. This is the standard way to handle errors for asynchronous operations.

// Can We Mix try...catch and fs.readFile?
// No: You cannot use try...catch directly with fs.readFile because fs.readFile is asynchronous. Errors that occur during the file reading operation are handled in the callback function provided to fs.readFile.
// Can We Use Callbacks with fs.readFileSync?
// No: fs.readFileSync does not accept a callback. It’s a synchronous function, so it returns the result directly or throws an error. To handle errors, you use try...catch.


// Use try...catch with fs.readFileSync to handle synchronous errors.
// Use callbacks with fs.readFile to handle asynchronous errors.
// Each method is designed to fit a different style of error handling based on whether the operation is synchronous or asynchronous.


// fs.readdir('./nodejs', (err, files) => {
//   if (err) {
//     console.error('Error reading directory:', err);
//     return;
//   }
//   console.log('Files in directory:', files);
// });