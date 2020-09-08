import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
  render() {
    return (
      <div className="menuPage">
        <div className="content">
          <div className="presentcontent">
            <h3>Present Content</h3>
            <ul>
              <li className="list">Reactjs</li>
              <li className="list">Jest</li>
              <li className="list"><dt>Miscellaneous:</dt>
              <dd className="list">ES6</dd>
              <dd className="list">Closure in js</dd>
              <dd className="list">New Js features</dd>
              <dd className="list">Array method .reduce in Js</dd>
              </li>
            </ul>
          </div>  
        </div>
      </div>
    );
  }
}