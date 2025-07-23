const { fork } = require('child_process');
const path = require('path');
// const __dirname = path.resolve();

console.log(__dirname)
// Generate a large array of numbers
const numbers = Array.from({ length: 1000000 }, (_, i) => i + 1);
const chunkSize = Math.ceil(numbers.length / 4); // Split into 4 chunks
const chunks = [];
for (let i = 0; i < numbers.length; i += chunkSize) {
  chunks.push(numbers.slice(i, i + chunkSize));
}

// Store results from child processes
const results = [];
let completed = 0;

// Spawn child processes
chunks.forEach((chunk, index) => {
  // Use path.resolve to get the absolute path of the child script
  // const child = fork('./child-worker.js', { cwd: __dirname }); // Path to child script
  // Alternatively, you can use path.join to construct the path
  // const child = fork(path.join(__dirname, 'child-worker.js')); // Path to child script
  

  // how many child processes can be forked, -> You can check this with the command ulimit -u in a terminal(unix/linux based systems)
  const child = fork(path.join(__dirname, 'child-worker.js')); // Path to child script
  child.send(chunk); // Send chunk to child process

  child.on('message', (result) => {
    results[index] = result; // Store result
    completed++;
    if (completed === chunks.length) {
      // All children done, combine results
      const total = results.reduce((sum, val) => sum + val, 0);
      console.log('Child Process Total Sum of Squares:', total);
      console.timeEnd('child_process');
    }
  });
});

console.time('child_process');