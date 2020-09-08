//process.stdin.resume();
process.stdin.setEncoding('ascii');


// process.on('exit', function(code) {
//     // Following code will never execute.
//     setTimeout(function() {
//        console.log("This will not run");
//     }, 0);
   
//     console.log('About to exit with code:', code);
//  });
//  console.log("Program Ended");
//  process.exit();

// var input_stdin = "";
// var input_stdin_array = "";
// var input_currentline = 0;

// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// process.stdin.on('data', function (data) {
//     if (data.length == 2) {
//         console.log('emitting end');
//         // eventEmitter.emit('end'); 
//         process.exit();
//     }   
//     input_stdin += data;
// });

process.on('beforeExit', () => {
  console.log('beofre exit gets called..');
});
 process.on('exit', function () {
   console.log('exiting...');
//     input_stdin_array = input_stdin.split("\r\n");	
//     console.log('input stdin', input_stdin_array);
//     let output = []
//     output = input_stdin_array.filter(ele => ele[0] == 1)
//     process.stdout.write("no of 1's"+output.length+"\n");
 });

process.on('SIGINT', () => {
    console.log("Terminating...");
    process.exit();
});


// Printing to console
process.stdout.write("Hello World!" + "\n");

// Reading passed parameter
process.argv.forEach(function(val, index/*, array */) {
   console.log(index + ': ' + val);
  // console.log(array);
});

// Getting executable path
console.log(process.execPath);

// Platform Information 
console.log(process.platform);

// Print the current directory
console.log('Current directory: ' + process.cwd());

// Print the process version
console.log('Current version: ' + process.version);

// Print the memory usage
console.log(process.memoryUsage());