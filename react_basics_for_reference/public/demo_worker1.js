

onmessage = function (event) {
  // Process the message received from the main thread
  const messageFromMainThread = event.data;
  this.postMessage(messageFromMainThread);
};

