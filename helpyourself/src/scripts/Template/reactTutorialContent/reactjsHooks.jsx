import React from 'react';

export default function() {
  return (
    <div>
      <h3> Hooks </h3>
      <p>Hooks is a new feature added to react in it's version 16.8.
        Hooks allows us to extract stateful logic from components 
        and we can use and test this independently</p>
      
      <blockquote>Hooks are functions that let you “hook into” 
        React state and lifecycle features from function components.
        Hooks don’t work inside classes — they let you use React without 
        classes.  <cite> --as per reactjs docs.</cite></blockquote>
      <h5>useState</h5>
      <p>userState is a Hook. It is used to add local state to function components.
        React preserve this state between rerenders. useState return a pair having
        a state variable and a function to update that variable. The only 
        argument passed to useState is used to set the initial value of the state variable.
        </p>
        <pre className="code">
        {
`
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`
        }
        </pre>
        <p>In the above example count is state variable with initial value of 0, and 
          setCount is method by using which we can update the value of count.
          For using multiple state variables, we have to use useState api multiple time 
          (below example)
        </p>
        <pre className="code">
        {
`
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
`
        }
        </pre>
        <h5>useEffect</h5>
        <p>
          Although Hooks api doesnt provide the lifecycle methods like we
          use in classes but here useEffect serves the same purpose as
          componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.
        </p>
        <pre className="code">
        {
`
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`
        }</pre>
        <p> when we use useEffect, means we are telling react to run 
          the effect after flulshing change to DOM. By default react runs 
          effects after every render - including the first one.<br/>
          We can optionaly return a function from inside the useEffect which
          will be like componentWillUnmount in react Classes. See below example:
        </p>
        <pre className="code">
        {
`
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
`
        }</pre>
        <p>
        just like with useState, we can use more than a single effect in a component.
        Also we can provide a condition only when the effect should run.(below example)
        </p>
        <pre className="code">
        {
`
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  },[props.friend.id]); // Only re-subscribe if props.friend.id changes

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
`       }</pre>
    </div>
  );
}