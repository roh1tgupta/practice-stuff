import React from 'react';

export default function Components () {
  return (
    <div>
      <h3>Components</h3>
      <p>In React, Components are defined to handle a particular type of concerns 
        having rendering, UI and events handling logics related to 
        that concern.
        They accept arbitrary inputs (called “props”) and 
        return React elements describing what should appear on the screen. 
      </p>
      <h3>Functional and Class component</h3>
      <p>There are two types of component , functional and class.</p>
      
      <pre className="code">
        {`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}


class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
`}
      </pre>
      <p>The above two components are equivalent from React's point of view.
        First one is functional component and second one is class component.
      
      A functional component is just a plain JavaScript function which
      accepts props as an argument and returns a React element.
      A class component requires to be extended from React.Component and 
      create a render function which returns a React element. 
      This requires more code but will also give 
      extra benefits of state and lifcycle explained in further section.
      As functional components dont have state, they are also called functional
      stateless component. 
      </p>
    <h3>Component Rendering</h3>
    <p>In earlier examples elements representing DOM rendered although
    elements can also represent component.
    </p>
    <pre className="code">
    { `const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
`}
    </pre>
    <p>
    In above example what is passed as attributes(name="sara") in Welcome
    component is called props(discussed more in further section).
    <br />
    A component can also return a component or group of components
    called child components as in below example.
    assuming(we have two more component Header and footer)
    </p>
    <pre className="code">
    {
      `class Welcome extends React.Component {
  render() {
    return <div><Header /><h1>Hello, {this.props.name}</h1><Footer/></div>;
  }
`
    }
    </pre>
  </div>);
}