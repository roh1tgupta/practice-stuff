var i = 0;
// let a = b; to execute worker.error uncomment this line
function timedCount(messageFromMainThread) {
    // console.log("demo wokrdre...hello from inside.", i)
  i = i + 1;
  // console.log("demo wokrdre....", i)
  // throw "error"
  postMessage({i, messageFromMainThread});
  setTimeout(() => timedCount(messageFromMainThread), 5000);
}

// timedCount();


onmessage = function (event) {
  // Process the message received from the main thread
  const messageFromMainThread = event.data;

  // Simulate some background processing
  // const result = performTask(messageFromMainThread);

  // Send the result back to the main thread
  // postMessage(result);
  timedCount(messageFromMainThread);
};

// Function to simulate some background processing
function performTask(message) {
  // Simulate a time-consuming task
  let result = message + ' Task completed in the Web Worker!';
  return result;
}