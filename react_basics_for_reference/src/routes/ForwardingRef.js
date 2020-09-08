import React, { Component } from 'react';

/*const FancyButton = React.forwardRef(function fancybutton(props, ref) {
    return <button className="FancyButton" ref={ref} onClick={() => props.clickHandl()}> {props.children} </button>
}
);*/   //see diff in react dev tool

function forwardref(props, ref) {
  return <button className="FancyButton" ref={ref} onClick={() => props.clickHandl()}> {props.children} </button>;
}
forwardref.displayName = 'rohit';

const FancyButton = React.forwardRef(forwardref);

/*
const FancyButton = React.forwardRef((props, ref) => (
  <button className="FancyButton" ref={ref} onClick={() => props.clickHandl()}> {props.children} </button>
  )
); */


export default class ForwardingRef extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log("hello");
    this.ref.current.style.backgroundColor = 'red';
    this.ref.current.style.color = 'yellow';
    console.log(this.ref.current);

  }

  render() {
    return <FancyButton ref={this.ref} clickHandl={() => this.clickHandler()}>Click Me!</FancyButton>;
  }
}
