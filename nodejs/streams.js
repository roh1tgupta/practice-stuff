const { Readable, Transform, pipeline } = require('stream');
const fs = require('node:fs');
const { stringify } = require('csv-stringify');

// 1. Create a Readable stream to generate sample data
class DataGenerator extends Readable {
  constructor(options) {
    super({ objectMode: true }); // objectMode for JSON objects
    this.count = 0;
    this.maxRecords = 5; // Generate 5 records for demo
  }

  _read() {
    if (this.count < this.maxRecords) {
      this.push({
        id: this.count + 1,
        name: `User${this.count + 1}`,
        age: 20 + this.count * 5,
      });
      this.count++;
    } else {
      this.push(null); // End the stream
    }
  }
}

// 2. Create a Transform stream to add a computed field
const addStatus = new Transform({
  objectMode: true, // Process objects
  transform(chunk, encoding, callback) {
    // Add a 'status' field based on age
    const status = chunk.age >= 30 ? 'Senior' : 'Junior';
    this.push({ ...chunk, status });
    callback();
  },
});

// 3. CSV Stringify stream (from csv-stringify)
const csvStringify = stringify({
  header: true, // Include CSV header
  columns: ['id', 'name', 'age', 'status'], // Define columns
});

// 4. Create a Writable stream to log data (for demonstration)
class LogStream extends Transform {
  constructor(options) {
    super({ writableObjectMode: true }); // Accept objects
  }

  _transform(chunk, encoding, callback) {
    console.log('Processing:', chunk.toString());
    this.push(chunk); // Pass data through
    callback();
  }
}

// 5. Set up the pipeline
const readStream = new DataGenerator();
const writeStream = fs.createWriteStream('output.csv');

pipeline(
  readStream, // Source: Generates user data
  addStatus, // Transform: Adds status field
  csvStringify, // Transform: Converts to CSV
  new LogStream(), // Transform: Logs data for debugging
  writeStream, // Destination: Writes to file
  (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.log('Pipeline completed successfully');
    }
  }
);

// Async/Await: You can use stream.promises.pipeline for a Promise-based version like below:
// await pipeline(readStream, addStatus, csvStringify, new LogStream(), writeStream);