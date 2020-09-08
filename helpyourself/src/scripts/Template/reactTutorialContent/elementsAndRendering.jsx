import React from 'react';

export default function ElementAndRendering () {
  return (
    <div>
      <h2> Elements in React</h2>
      Elements are what Component are made of. In React App, these are the smallest building block.
      Whatever we see on the screen are described by elements.
      <pre className="code">
      {
        "const element = <h1>Hello, world</h1>;"
      } 
      </pre>
      so far we have used below line of code many times for rendering element.
      <pre className="code">
      {
        "ReactDOM.render(element, document.getElementById('root'));"
      } 
      </pre>
      This is because there is {"<div>"} in index.html file:
      <pre className="code">
      {
        `<div id="root"></div>`
      }
      </pre>
      This is root DOM node because everything inside this would be managed by React DOM in our React App.
      <br />
      ReactDOM.render does the work of rendering. It takes two parameter,
      first one is React Element which to be rendered and other is root DOM into which
      React Element is rendered.
      <pre className="code">
      {
        `const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));`
      } 
      </pre>
      React Elements are immutable, the only way to update UI is to create a new element
      and pass it to ReactDOM.render().
      <h4>One important point to be noted here:</h4>
      React DOM compares the element and its children to the previous one,
      and only applies the DOM updates necessary to bring the DOM to the desired state.
    </div>
  );
  }