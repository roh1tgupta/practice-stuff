import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggle: true };
    this.clickHandler = this.clickHandler.bind(this);
  }
/* name is string passed and thisone is handler object passed by default by the clickHandler
   in case nothing is passed then default handler object is passed to the first argument . here when no string is passed 
   then default handler object passed by clickhandler will be assigned to name and thisone will be undefined
   */
  clickHandler(name, thisone) {
    console.log(arguments.length);
    if (this.state.isToggle) {
      console.log("abcd_ true",thisone ? name : 'no name is passed');
    }
    else {
      console.log("abcd_false",thisone ? name : 'no name is passed');
    }
    this.setState(prevState => ({ isToggle: !prevState.isToggle }));
  }

  render() {
    return (
      <div>
        { this.state.isToggle &&  //this is how we pass string to the clickHandler
          <h3 onClick={this.clickHandler.bind(this, 'rohit')}>true: click me to make it false</h3>
        }

        { !this.state.isToggle && 
          <h3 onClick={this.clickHandler}>false: click me to make it true</h3>
        }
      </div>
    );
  }
}


  export default Toggle;