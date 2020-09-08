import React from 'react';

export default function EventsHandling () {
  return (
    <div>
      <h3>Events Handling</h3>
      In React events are named using camelCase and 
      when using JSX, function is passed as event handler, rather than a string.
      For example:
      <pre className="code">
        { 
          `class EventHandler extends React.component {
  constructor {
    super(props);
    // This binding is necessary to make 'this' work in the callback
    this.activateLasers = this.activateLasers.bind(this);
  } 
  
  activateLasers(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  
  render(){
    <button onClick={this.activateLasers}>
      Activate Lasers
    </button>
  }
}
          `
        }
      </pre>
      e.preventDefault() is used for preventing default behaviour in React.
      here activateLasers is function defined in class.
      In JavaScript, class methods are not bound by default that's why binding is done
      in constructor.
      <br/>
      if we use arrow function in the callback we dont need to bind method
      contructor.
      <pre className="code">
      {
        `// This syntax ensures 'this' is bound within handleClick
return (
  <button onClick={(e) => this.handleClick(e)}>
    Click me
  </button>
);
        `
      }
      </pre>
      <h3>Passing arguments to EventHandlers</h3>
      <pre className="code">
      {
        `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
        `
      }
      </pre>
      Above both lines of code i.e. using arrow functiona and using
      Function.prototype.bind are equivalent.
      In both cases, the e argument representing the React event will be
       passed as a second argument after the ID. With an arrow 
       function, we have to pass it explicitly, but with bind any 
       further arguments are automatically forwarded
    </div>
  );
}