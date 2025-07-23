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



// Stabilized: The fs.promises API was marked as stable in Node.js v14.0.0 (released on April 21, 2020), meaning it was considered production-ready and no longer experimental.

// const fs = require('fs/promises');
// const path = require('path');

// async function fileOperations() {
//   const filePath = path.join(__dirname, 'example.txt'); // __dirname is the absolute path to the current directory
//   try {
//     // Write to file
//     await fs.writeFile(filePath, 'Hello, Node.js!');
//     console.log('File written');

//     // Append to file
//     await fs.appendFile(filePath, '\nMore text');
//     console.log('Text appended');

//     // Read file
//     const data = await fs.readFile(filePath, 'utf8');
//     console.log('File content:', data);

//     // Check file stats
//     const stats = await fs.stat(filePath);
//     console.log('File size:', stats.size, 'bytes');

//     // Delete file
//     await fs.unlink(filePath);
//     console.log('File deleted');
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }
// fileOperations();




// When to Use fs.readFile/fs.writeFile
// File Size is Small:
  // For files that are small (e.g., a few KB or MB), loading the entire file into memory is fast and doesn’t strain system resources.
  // Example: Configuration files (JSON, YAML), small text files, or short logs.
// Simplicity is Key:
  // If the operation is straightforward (e.g., read a file, process it, write it back), these methods are easier to implement than streams.
  // Example: Reading a small JSON file to parse its contents.
// One-Time Operations:
  // When you need to read or write a file in a single operation without processing data incrementally.
  // Example: Writing a short report to a file.
// Low Frequency of Operations:
  // For infrequent file operations where performance optimization isn’t critical.


  // When to Use Streams
  // Use streams (fs.createReadStream/fs.createWriteStream) when:
  
  // File Size is Large:
    // For large files (e.g., videos, large CSVs, logs exceeding tens of MB or GB), streams prevent memory overload by processing data in chunks (default chunk size: 64KB for readable streams).
    // Example: Processing a 1GB log file or streaming a video.
  // Memory Efficiency is Critical:
    // Streams minimize memory usage by reading/writing data incrementally, making them suitable for resource-constrained environments.
    // Example: Servers handling multiple large file uploads/downloads.
  // Real-Time or Continuous Processing:
    // When you need to process data as it’s read (e.g., transforming data, streaming to a client, or piping to another stream).
    // Example: Compressing a file on-the-fly or sending a file to a client over HTTP.
  // Pipelining or Chaining Operations:
    // Streams allow you to pipe data through multiple processing steps (e.g., read → transform → write).
    // Example: Reading a file, transforming its content (e.g., converting to uppercase), and writing to another file.
  // Handling Backpressure:
    // Streams handle backpressure automatically, pausing reading when the write destination can’t keep up, which is useful for network or disk I/O.
  
  // What is Backpressure?
  // Backpressure occurs in systems where data is produced faster than it can be consumed or processed. In Node.js streams, this happens when the source (e.g., a readable stream like fs.createReadStream) generates data faster than the destination (e.g., a writable stream like fs.createWriteStream or a network socket) can handle it. Without proper handling, this mismatch can lead to memory issues, as data accumulates in memory buffers, potentially crashing the application.

// const fs = require('fs');
// const path = require('path');

// // File paths using __dirname
// const inputFile = path.join(__dirname, 'large.txt');
// const outputFile = path.join(__dirname, 'output.txt');

// // Create a large file for testing (e.g., 100MB)
// try {
//   fs.writeFileSync(inputFile, Buffer.alloc(100 * 1024 * 1024, 'a')); // 100MB of 'a'
//   console.log('Test file created: large.txt');
// } catch (err) {
//   console.error('Error creating test file:', err);
//   return;
// }

// // Create readable and writable streams
// const readStream = fs.createReadStream(inputFile, {
//   highWaterMark: 64 * 1024, // 64KB chunks for reading
// });
// const writeStream = fs.createWriteStream(outputFile, {
//   highWaterMark: 16 * 1024, // 16KB buffer for writing (smaller to simulate bottleneck)
// });

// // Manual handling of backpressure
// readStream.on('data', (chunk) => {
//   console.log(`Read chunk: ${chunk.length} bytes`);
//   const canWrite = writeStream.write(chunk);
//   if (!canWrite) {
//     console.log('Buffer full, pausing read stream...');
//     readStream.pause(); // Pause reading when write buffer is full
//     writeStream.once('drain', () => {
//       console.log('Buffer drained, resuming read stream...');
//       readStream.resume(); // Resume when writable stream is ready
//     });
//   }
// });

// readStream.on('end', () => {
//   writeStream.end();
//   console.log('Finished reading and writing');
// });

// readStream.on('error', (err) => {
//   console.error('Read error:', err);
// });

// writeStream.on('error', (err) => {
//   console.error('Write error:', err);
// });

// writeStream.on('finish', () => {
//   console.log('File copy complete');
// });


// Using .pipe() for Automatic Backpressure
// The above example manually handles backpressure for clarity. In practice, you can use .pipe() to let Node.js handle backpressure automatically:
// const fs = require('fs');
// const path = require('path');

// const inputFile = path.join(__dirname, 'large.txt');
// const outputFile = path.join(__dirname, 'output.txt');

// const readStream = fs.createReadStream(inputFile, { highWaterMark: 64 * 1024 });
// const writeStream = fs.createWriteStream(outputFile, { highWaterMark: 16 * 1024 });

// readStream.pipe(writeStream);

// readStream.on('end', () => {
//   console.log('Streaming complete');
// });

// readStream.on('error', (err) => console.error('Read error:', err));
// writeStream.on('finish', () => console.log('File copy complete'));
// writeStream.on('error', (err) => console.error('Write error:', err));


// How .pipe() Works:
// .pipe() internally monitors the writable stream’s buffer. If it fills up, .pipe() pauses the readable stream until the drain event is emitted.
// This abstracts away manual pause/resume logic, making it simpler and less error-prone.