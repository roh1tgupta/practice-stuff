const fs = require('fs');

const readableStream = fs.createReadStream('./nodejs/nodejs/rohit.txt', {
  encoding: 'utf8', // without this, there would be raw buffer
  highWaterMark: 1 * 1024 // 1 KB, if we dont specify this, defualt is 64kb
});

readableStream.on('data', (chunk) => {
  console.log('Received recived .....chunk:', chunk);
});

readableStream.on('end', () => {
  console.log('No more data to read.');
});
