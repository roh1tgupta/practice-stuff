import React from 'react';
// import { config } from '../config.js';
// import { navLinks } from '../config.js';
// import NavlinkDialog from '../Template/NavlinkDialog';

export default function() {
  return (
    <div className="header">
      <div className="heading">
        <div className="leftSide"><div className="logo">HelpYourself!</div></div>
        <div className="rightSide"><div>{this.props && this.props.name ? this.props.name : ''}</div></div>
      </div>
    { /*  <div className='navLinks'>{navLinks.map(value => <li key={value} onMouseOver={() => this.setDialog(value)}
        onFocus={() => this.setDialog(value)} onMouseLeave={this.removeDialog} onBlur={this.removeDialog}><a href="">{value}</a>
        { this.state.showNavlinkDialog && this.state.navLinkValue === value &&
        <NavlinkDialog value={this.state.navLinkValue}/>
      }</li>)}</div>
    */ }
      
    </div>
  );
}