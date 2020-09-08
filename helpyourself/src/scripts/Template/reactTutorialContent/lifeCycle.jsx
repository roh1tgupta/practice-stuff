import React from 'react';

export default function LifeCycle () {
  return (
    <div>
      <h3>LifeCycle</h3>
      When a compoent is first time rendered to DOM, it is called mounting.
      and when it is removed, it is called unmounting in react.
      In react some special methods are defined for class to run some specific
      code when a component mount and unmount. These methods are called LifeCycle
      methods.
      <pre className="code">
      {
        `class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
      
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
    
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
        
  tick() {
    this.setState({
      date: new Date()
    });
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
        
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
        `
      }</pre>

      In above example, although only two lifecycle methods are used, there are few more.
      Above clock component runs every second. In Constructor date statevariable
      is initialized with current date. when this component is first rendered means when it
      is mounted then componentDidMount method gets called where time interval of 1 second
      is set for calling tick() method. and tick method update state variable.
      and as state is updated, component is re-rendered with current time.
      when the component will be unmounted, componentWillUnmount will get called and here
      time interval is removed.
    <h4>Things to be noted about setState():
    </h4>
    <ul>
      <li>Can't modify the state directly, instead use setState()</li>
      </ul>
      <pre className="code">
      {`// Wrong
this.state.comment = 'Hello';
// Correct
this.setState({comment: 'Hello'});
      `
      }</pre>
      <ul><li>State Updates are not synchronous every time</li></ul>
      React may batch multiple setState() calls into a single update for performance
      For example, this code may fail to update the counter
      <pre className="code">
      {`// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
      `
      }</pre>
      Second form of setSate fix this problem by accepting function rather than 
      object.function will receive the previous state as the first argument,
       and the props at the time the update is applied as the 
       second argument:
       <pre className="code">
      {`// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
      `
      }</pre>
      above, in pace of arraow function we can use regular function also.
    <ul><li>State Updates are Merged</li></ul>
    When setState() is called, React merges the object provided 
    into the current state
    <br />
    For example, your state may contain several independent variables:
    <pre className="code">
    {
      `constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
      `
    }</pre>
    These can be updated independently with seperate setState() calls.
    The merging is shallow, so {`this.setState({comments})`} leaves 
    this.state.posts intact, but completely replaces this.state.comments.    
    </div>
  );
}