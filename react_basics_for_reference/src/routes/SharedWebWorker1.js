import React, { useEffect } from 'react';

const SecondComponent = () => {
  useEffect(() => {
    const sharedWorker = new SharedWorker('./shared-worker.js');

    // Handling messages from the Shared Worker
    sharedWorker.port.onmessage = function (event) {
      console.log('Message from Shared Worker to the second component:', event.data);
    };

    // Sending a message to the Shared Worker
    sharedWorker.port.postMessage('Hello from the second component!');

    // Clean up the worker when the component is unmounted
    return () => {
      sharedWorker.port.close();
    };
  }, []);

  return (
    <div>
      <h2>Second React Component</h2>
    </div>
  );
};

export default SecondComponent;