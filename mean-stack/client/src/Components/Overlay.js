import React from 'react';
import './Overlay.scss';

const Overlay = (props) => {
  return (
    <div className="overlay">
      <i className="material-icons" onClick={() => props.close()}>close</i>
      <div className="body">
        <div className="card">
          <div className="leftBlock">
            <div className="image">
              <img src={props.item.photo} />
            </div>
          </div>
          <div className="rightBlock">
            <div className="content">
              <p>I am a very simple card. I am good at containing small bits of information.</p>
            </div>
            <div className="action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Overlay;