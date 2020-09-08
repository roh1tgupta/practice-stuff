import React from 'react';
import Car from './Car';
import Bike from './Bike';
import HOC from './HOC';

export default class HigherOrderComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      type: ''
    }
  }
  handleClick(e) {
    this.setState({type: e.target.value});
  }

  render() {
      const { type } = this.state;
      const Component = type ? (type === 'car' ? HOC(Car, type) : HOC(Bike, type)) : null; 
      return (
          <React.Fragment>
              <ul>
                  <li><button onClick={e => this.handleClick(e)} value="car">Car</button></li>
                  <li><button onClick={e => this.handleClick(e)} value="bike">bike</button></li>
              </ul>
              {
                Component && <Component name1={'rohit'}/>
              }
          </React.Fragment>
      ); 
  }
}