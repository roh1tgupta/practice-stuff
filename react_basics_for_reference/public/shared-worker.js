onconnect = function (event) {
    const port = event.ports[0];
    let porttt = event.ports.length;
    // Handling messages from the connected browser context
    port.postMessage("connected ")
    port.onmessage = function (event) {
      const messageFromMain = event.data;
      console.log('Message from main:', messageFromMain);
  
      // Sending a response back to the main thread
      port.postMessage(`Hello from the Shared Worker!, ${messageFromMain} ${porttt}`);
    //   port.postMessage(porttt);
    };
  };
  