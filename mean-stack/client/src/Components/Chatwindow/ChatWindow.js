import React, { useState } from 'react';
import closeIcon from '../../icons/closeicon.png';
import ReactEmoji from 'react-emoji';
import ScrollToBottom from 'react-scroll-to-bottom';
import './ChatWindow.css';

const ChatWindow = ({user, messages, handleEnter, closeChatWindow, myid, sentMessageStatus}) => {
  const [onlyShowTitle, setOnlyShowTitle] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' &&  !e.shiftKey) {
      handleEnter(e)
    }
  }
  console.log(messages);
  return ( user ? (
    <div className="card chat-window" >
      <div className="title-section">
        <div className="chatee-img">
          {!user.isGroup ? <img src={user.pic} alt="user" /> : <i className="material-icons">group</i>}
        </div>
        <div onClick={() => setOnlyShowTitle(!onlyShowTitle)} className="chatee-name">
          <div>{user.name} ({user.isOnline ? 'online' : 'offline'})</div>
          <div></div>
        </div>
        <div className="close-icon" onClick={() => closeChatWindow()}>
          <img src={closeIcon} alt="user" />
        </div>
      </div>
      { !onlyShowTitle && 
        <ScrollToBottom className="body-section">
        {
          messages && messages.length > 0 && messages.map((message, index) => {
            let time = '';
            if (message.timeStamp) {
              const local = new Date(message.timeStamp);
              time = `${local.getHours()}:${local.getMinutes()}`;
            }
            if (message.from._id !== myid) {
              return (
              <div className="chatee-user" key={`${myid}-${index}`}>
                <div className="chatee-user-img">
                  <img src={message.from.pic} alt="user" />
                  <div className="time-in-hr-min">{time}</div>
                </div>
                <div className="chatee-user-message">
                  {user.isGroup && <div className="sender-name">{message.from.name}</div>}
                  {ReactEmoji.emojify(message.message)}
                </div>
              </div>);
            }
            return (
              <div className="user-himself" key={`${myid}-${index}`}>
                <div className="user-himself-message">
                  {message && ReactEmoji.emojify(message.message)}
                  <div className="time-in-hr-min">
                    {time}{messages.length === (index + 1) && <div>{sentMessageStatus}</div>}
                  </div>

                </div>

              </div>
            )
          })
        }
        </ScrollToBottom>
      }
      
      { !onlyShowTitle && 
        <div className="text-input">
          <textarea id="textarea1" rows="1" placeholder="type here and press enter..." onKeyDown={e => handleKeyDown(e)}/>
        </div>
      }
      
    </div>
  ) : null);
};

export default ChatWindow;