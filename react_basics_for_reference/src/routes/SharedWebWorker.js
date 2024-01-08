import React, { Fragment, useEffect, useRef } from 'react';

const FirstComponent = () => {
  const ref = useRef();
  useEffect(() => {
    const sharedWorker = new SharedWorker('./shared-worker.js');
    ref.current = sharedWorker;
    // Handling messages from the Shared Worker
    sharedWorker.port.onmessage = function (event) {
      console.log('Message from Shared Worker to the first component:', event.data);
    };

    // Sending a message to the Shared Worker
    sharedWorker.port.postMessage('Hello from the first component!');
    

    // Clean up the worker when the component is unmounted
    return () => {
      sharedWorker.port.close();
    };
  }, []);

  return (
    <div>
      <h2>First React Component</h2>
      <button onClick={() => ref.current.port.postMessage('Hello from the first component!')}>post message</button>
    </div>
  );
};

const SecondComponent = () => {
    const ref = useRef();
    useEffect(() => {
      const sharedWorker = new SharedWorker('./shared-worker.js');
      ref.current = sharedWorker;
      // Handling messages from the Shared Worker
      sharedWorker.port.onmessage = function (event) {
        console.log('Message from Shared Worker to the first/second component:', event.data);
      };
  
      // Sending a message to the Shared Worker
      sharedWorker.port.postMessage('Hello from the first/second component!');
      
  
      // Clean up the worker when the component is unmounted
      return () => {
        sharedWorker.port.close();
      };
    }, []);
  
    return (
      <div>
        <h2>First React Component</h2>
        <button onClick={() => ref.current.port.postMessage('Hello from the first/second component!')}>post message</button>
      </div>
    );
  };

export default function() {
    return <React.Fragment>
    <FirstComponent />
    <SecondComponent />
    </React.Fragment>
};
