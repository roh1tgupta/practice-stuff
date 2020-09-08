import { Component } from 'react';
import TemplateJSX from './Template.jsx';

export default class Template extends Component {
  render() {
    return TemplateJSX.call(this);    
  }
}