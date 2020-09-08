import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = ({ time: new Date() })
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({ time: new Date() });
  }

  render() {
    return (
        <div>
          <h1> {this.state.time.toLocaleTimeString()} </h1>
        </div>
    );
  }
}

export default Clock;