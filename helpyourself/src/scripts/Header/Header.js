// not prepared
import { Component } from 'react';
import Template from './Header.jsx';

export default class Header extends Component {
  constructor() {
    super();
    this.setDialog = this.setDialog.bind(this);
    this.removeDialog = this.removeDialog.bind(this);
    this.state = ({
      showNavlinkDialog: false,
      navLinkValue: null
    })
  }

  setDialog(value) {
    console.log(value);
    this.setState({ showNavlinkDialog: true, navLinkValue: value });
  }

  removeDialog() {
    this.setState({ showNavlinkDialog: false, navLinkValue: null});
  }

  render() {
   return Template.call(this); 
  }
}