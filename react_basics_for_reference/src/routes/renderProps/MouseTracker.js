import React, { Component } from 'react';
import img from '../../images/image_cat.jpg'; // either use src={img} or in the way as it is used below if using webpack
// other wise <img src={'path/to/image_cat.jpg'} />
class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src={require('../../images/image_cat.jpg')} style={{ height: '25px', width: '25px', position: 'fixed', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}

export default class MouseTracker extends Component {
  render() {
    const Abc= withMouse(Cat);
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

