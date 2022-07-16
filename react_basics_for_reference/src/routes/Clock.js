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

class Clock1 extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      count: 1
    };
  }
  consolef = (item, ab) => console.log(item);


  shouldComponentUpdate(prevPros, state) {
  }

  componentDidMount() {

    function ab (item) {
      console.log(this);
      this.consolef(item);
    }
    this.props.arr.map(ab, this)
    // this.props.arr.map(ab)

  }
  render() {
    console.log("rendered");
    return (
        <div>
          <h1 onClick={() => {
            this.setState({count: this.state.count + 1});
            // alert(this.state.count)
          }
          }> {this.props.arr.length} {this.state.count}</h1>
        </div>
    );
  }
}

export default Clock1;