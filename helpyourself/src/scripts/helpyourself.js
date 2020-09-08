import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MainBody from './MainBody/MainBody.js';

export default class HelpYourSelf extends Component {
  constructor() {
    super(); // here if we dont use super below line would throw an error
    this.state={name:''};
  }

  changeState(name) {
    this.setState({name});
  }
  render() {
    return (<div>
      <Header name={this.state.name}/>
      <MainBody changeState={(name) => this.changeState(name)}/>
      <Footer />
    </div>)
  }
}