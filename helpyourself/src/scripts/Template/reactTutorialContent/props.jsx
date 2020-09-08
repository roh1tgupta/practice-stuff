import React from 'react';

export default function Props () {
  return (
    <div>
      <h3>Props</h3> 
      <p>
      When React sees an element representing a 
      user-defined component, it passes JSX attributes 
      to this component as a single object. We call this 
      object “props”
      </p>
      <pre className="code">
      {
        ` function Welcome(props) {
  return <h1>Hello, {props.firstName + ' ' + props.lastName}</h1>;
}

const element = <Welcome firstName="Sara" lastName="Khan" />;
ReactDOM.render(
  element, document.getElementById('root')
);`
      }
      </pre>
      When using class component we access props as this.props as shown below.
      <pre className="code">
      {
        `class Welcome extends React.Component {
render() {
  return (
    <div>
      <Header />
      <h1>Hello, {this.props.firstName + '' + this.props.lastName}</h1>
      <Footer/>
    </div>
  );
}`
      }
      </pre>
      <h2>States</h2>
      <pre className="code">
      {
        `class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
        
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
        `
      }
      </pre>
      Class components should always call the base constructor with props.
      In constructor date is defined as state variable with value of current date.
      This is how we set initial value to state variable. and also notice how
      the state variable are used in render method.
      <br />
      whenever the state variable is updated, react re-render the component
      and while re-rending only that value is updated which has changed.
      <pre className="code">
      {
        `class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
        
  render() {
    return (
      <div>
        <button onClick={() => this.setState{date: new Date()}}>
          click me to get current time
        </button>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}`
      } </pre>

      now the when user clicks on button, date is set to new value so component
      is re-rendered. here also note how the state variable is set.
    </div>
  );
}