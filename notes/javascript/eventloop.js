
// const fs = require('fs');

// setTimeout(() => {
//   console.log('Timer callback executed');
// }, 0);

// fs.readFile('./sapSolution.js', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log('File operation callback executed');
// });

// function createCounter(initialValue) {
//   let count = initialValue;

//   return function() {
//     count++;
//     console.log(count);
//   };
// }

// const counter = createCounter(5);
// counter()
// counter(); // 6

// const fs = require("fs");
// // cb1
// setImmediate(() => console.log("Set immidiate"));
// // cb2
// setTimeout(() => console.log("TImer expired"), 0);
// // cb3
// Promise.resolve("Reolved promise").then(console.log);
// // cb4
// fs.readFile("./test.txt", "utf8", (err, data) => {
//   console.log("Data read executed");
//   // cb6
//   setTimeout(() => console.log("ndSet timeout inside readfile"), 0);
//   // cb7
//   Promise.resolve("Promise resolve inside readfile").then(console.log);
//   process.nextTick(() => console.log("Process.nextTick inside readfile"));
//   // cb8
//   setImmediate(() => console.log("Set immidiate inside readfile"));
//   console.log("File reading cb");
// });
// // cb5
// process.nextTick(() => console.log("Process.nextTick"));
// console.log("Last line");


console.log('Start');
process.nextTick(() => console.log('nextTick'));
queueMicrotask(() => console.log('queueMicrotask1'));
Promise.resolve().then(() => console.log('Promise1'));
queueMicrotask(() => console.log('queueMicrotask2'));
Promise.resolve().then(() => console.log('Promise2'));
console.log('End');
setTimeout(() => console.log('Timer'), 0);