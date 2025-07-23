const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// Main thread logic
if (isMainThread) {
  // Generate a large array of numbers
  const numbers = Array.from({ length: 1000000 }, (_, i) => i + 1);
  const chunkSize = Math.ceil(numbers.length / 4); // Split into 4 chunks
  const chunks = [];
  for (let i = 0; i < numbers.length; i += chunkSize) {
    chunks.push(numbers.slice(i, i + chunkSize));
  }

  // Store results from workers
  const results = [];
  let completed = 0;

  // Create workers
  console.time('worker_threads');
  chunks.forEach((chunk, index) => {
    // __filename refers to the absolute path of the current module file.
    const worker = new Worker(__filename, { workerData: chunk });
    worker.on('message', (result) => {
      results[index] = result; // Store result
      completed++;
      if (completed === chunks.length) {
        // All workers done, combine results
        const total = results.reduce((sum, val) => sum + val, 0);
        console.log('Worker Threads Total Sum of Squares:', total);
        console.timeEnd('worker_threads');
      }
    });
    worker.on('error', (err) => console.error(err));
  });
} else {
  // Worker thread logic
  const sum = workerData.reduce((acc, num) => acc + num * num, 0);
  parentPort.postMessage(sum); // Send result back to main thread
}



// Does worker_threads use libuv? Yes, worker_threads relies on libuv for low-level thread creation, management,
//  and communication, but it operates differently from the libuv thread pool used for I/O tasks.

// How does it work? worker_threads creates isolated JavaScript threads with their own V8 instances and event loops,
//  making it ideal for CPU-intensive tasks. libuv facilitates the threading and communication infrastructure but does not execute JavaScript code itself in this context.

// Key Difference: Unlike the libuv I/O thread pool, which is shared and handles C++-level I/O tasks,
// worker_threads runs JavaScript in parallel threads with explicit control and isolated environments.

// By default, worker_threads in Node.js do not share memory. Each worker runs in its own V8 instance with isolated memory.
// However, Node.js does provide mechanisms for memory sharing between threads:
// SharedArrayBuffer: Allows sharing memory between threads
// ArrayBuffer transfers: Lets you transfer ownership of ArrayBuffers
// MessageChannel: For efficient communication between threads