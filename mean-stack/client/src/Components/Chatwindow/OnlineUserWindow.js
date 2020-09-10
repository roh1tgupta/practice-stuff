import React, { useState, useRef, useEffect } from 'react';
import online from '../../icons/online.jpg';
import ScrollToBottom from 'react-scroll-to-bottom';
import M from 'materialize-css';
import './OnlineUserWindow.css';
import CreateGroupChat from './CreateGroupChat';
import DropDown from './DropDown';

const OnlineUserWindow = ({users, clickHandler, createGroup,
    groupChats, clickGroupHandler, leaveGroup, deleteGroup}) => {
  const [showOnlyTitle, setShowOnlyTitle] = useState(true);
  const reftomodal = useRef(null);

  M.Modal.init(reftomodal.current);
  return ( users && users.length > 0 &&
    <div className="card online-user-window">
      <div className="online-user-window-title-section" onClick={() => setShowOnlyTitle(!showOnlyTitle)}>
        <div className="title">Chats</div>
        <div className="online-user-count">
          Online ({users.filter(user => user.isOnline).length})
        </div>
      </div>
      <div id="modal2" className="modal" ref={reftomodal}>
        <CreateGroupChat users={users} createGroup={createGroup}/>
      </div>
      { !showOnlyTitle && (
        <ScrollToBottom className="user-list-container">
          <div
            className="user-list modal-trigger"
            data-target="modal2"
            
          >
            Create a group
          </div>
          {
            groupChats.length > 0 && groupChats.map(grp => (
              <div
                className="user-list"
                key={grp._id}
              >
                <div className="user-list-img">
                  <i className="material-icons">group</i>
                </div>
                <div className="user-list-name"
                  onClick={() => clickGroupHandler(grp)}
                >
                  {grp.name}
                </div>
                <div
                  className="user-list-img"
                >
                  { 
                    grp.newMessage ? (
                      <span className="new badge">1</span>
                    ) : grp.isowner ? (
                      <abbr title="delete" onClick={() => deleteGroup(grp)}>
                        <i className="material-icons">delete</i>
                      </abbr>
                    )
                      : (
                        <abbr title="leave" onClick={() => leaveGroup(grp)}>
                          <i className="material-icons">directions_walk</i>
                        </abbr>
                      )
                  }
                  
                </div>
                {/* <ul id='dropdown1' className='dropdown-content' ref={reftodropdown}>
    <li>delete</li>
    <li>add</li>
    <li>remove</li>
  </ul> */}
              </div>
            ))
          }
          {
            users.map(user => (
              <div
                className="user-list"
                onClick={() => clickHandler(user)}
                key={user._id}
              >
                <div className="user-list-img"><img src={user.pic} alt="user"/></div>
                <div className="user-list-name">{user.name}</div>
                <div className="user-list-img">
                  { user.newMessage ? (
                    <span className="new badge">1</span>
                  ) : user.isOnline ? <img src={online} alt="user"/> : (
                    <div className="offline"></div>
                  )}
                </div>
              </div>
            ))
          }
        </ScrollToBottom>
      )}
      
    </div>
  );
}

export default OnlineUserWindow;