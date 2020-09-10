import React, { useState, useEffect, useRef } from 'react';
import OnlineUserWindow from './OnlineUserWindow';
import ChatWindow from './ChatWindow';

import io from 'socket.io-client';
const socket = io('http://localhost:5000', { upgrade: false, transports: ['websocket'] })

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.chatHistory = this.chatHistory.bind(this);
    this.addedingrpchat = this.addedingrpchat.bind(this);
    this.onlineUser = this.onlineUser.bind(this);
    this.groupChats = this.groupChats.bind(this);
    this.chatMessage = this.chatMessage.bind(this);
    this.goingoffline = this.goingoffline.bind(this);
    this.onlinestatus = this.onlinestatus.bind(this);
    this.Submit = this.Submit.bind(this);
    this.clickGroupHandler = this.clickGroupHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.closeChatWindow = this.closeChatWindow.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.onleftgrp = this.onleftgrp.bind(this);
    this.onGroupDeleted = this.onGroupDeleted.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
    this.onSeen = this.onSeen.bind(this);

    this.state = {
      showChat: false,
      onLineUsers: [],
      messages: [],
      chatWith: '',
      groupChats: [],
      sentMessageStatus: {}
    };
  }

  componentDidMount() {
    socket.on('chatHistory', this.chatHistory)
    socket.on('addedingrpchat', this.addedingrpchat);
    socket.on('error', () => {
      console.log('some error has occurred');
    })
    socket.on('online-users', this.onlineUser);
    socket.on('group-chats', this.groupChats)
    socket.on('chat-message', this.chatMessage)
    socket.on('goingoffline', this.goingoffline)
    socket.on("onlinestatus", this.onlinestatus)
    socket.on("leftgrp", this.onleftgrp)
    socket.on("groupdeleted", this.onGroupDeleted);
    socket.emit('new-user', this.props.user);
    socket.on('ping', () => console.log('ping message'));
    socket.on('pong', () => console.log('pong message'));
    socket.on('received', this.messageReceived);
    socket.on('seen', this.onSeen);
  }

  componentWillUnmount() {
    socket.emit('disconnected');
    console.log('unmounting...');
  }

  onSeen(id) {
    this.setState({sentMessageStatus: {
      ...this.state.sentMessageStatus,
      [`${id}`]: 'seen'
    }})
  }
  messageReceived(id) {
    this.setState({sentMessageStatus: {
      ...this.state.sentMessageStatus,
      [`${id}`]: 'delivered'
    }})
  }
  onleftgrp(grp) {
    const grpchats = this.state.groupChats.filter(chat => chat.chatroom !== grp);
    if (this.state.chatWith && this.state.chatWith._id === grp) {
      this.setState({chatWith: ''})
    }
    this.setState({groupChats: grpchats});
  }

  onGroupDeleted(grp) {
    const grpchats = this.state.groupChats.filter(chat => chat.chatroom !== grp);
    if (this.state.chatWith && this.state.chatWith._id === grp) {
      this.setState({chatWith: ''})
    }
    this.setState({groupChats: grpchats});
    socket.emit('removeGrpId', grp);
  }

  chatHistory(chatHistory) {
    // console.log(chatHistory.chats);
    this.setState({messages: chatHistory ? chatHistory.chats : []})
  }

  leaveGroup(grp) {
    socket.emit('leaveGroup', grp.chatroom)
    // console.log(grp)
  }

  deleteGroup(grp) {
    socket.emit('deleteGroup', grp.chatroom);
    // console.log(grp);
  }

  addedingrpchat(obj) {
    this.setState({groupChats: [...this.state.groupChats, obj]})

      socket.emit('joingrpchat', obj.chatroom);
  }

  onlineUser(users) {
      // console.log(users);
    this.setState({onLineUsers: users})

  }
  
  groupChats(data) {
    this.setState({groupChats: data})
  }
  
  chatMessage(data) {
    if (!data.grpId) {
      if (this.state.chatWith._id === data.from._id) {
        socket.emit('message-seen', data.from._id);  
      } else {
        socket.emit('message-received', data.from._id);
      }
      this.setState({sentMessageStatus: {
        ...this.state.sentMessageStatus,
        [`${data.from._id}`]: ''
      }});
    }
    
    // callback('delivered');
   
    if (data.grpId) {
      if (this.state.chatWith._id === data.grpId) {
        this.setState({messages: [...this.state.messages, data]});
        return;
      }
      const groupChats =  this.state.groupChats.map(user => {
        if (user.chatroom === data.grpId) {
          return {...user, newMessage: true};
        } else {
          return user;
        }
      });
      this.setState({groupChats});
      return;
    } else if (this.state.chatWith && this.state.chatWith._id === data.from._id) {
      this.setState({messages: [...this.state.messages, data]})
      return;
    }

    const sender = {...data.from};
    sender.newMessage = true;
    sender.isOnline = true;
    
    const onLineUsers =  this.state.onLineUsers.map(user => {
      if (user._id === sender._id) {
        return sender;
      } else {
        return user;
      }
    });
    this.setState({onLineUsers});
  }

  goingoffline(usr) {
      const users = this.state.onLineUsers.map(user => {
        if (usr === user._id) {
          return {...user, isOnline: false };
        }
        return user;
      });
      this.setState({onLineUsers:users})
      if (this.state.chatWith._id === usr) {
        this.setState({chatWith: {...this.state.chatWith, isOnline: false}})
      }
  }

  onlinestatus(id) {
      const users = this.state.onLineUsers.map(user => {
        if (id === user._id) {
          return {...user, isOnline: true };
        }
        return user;
      });
      this.setState({onLineUsers:users})

      if (this.state.chatWith._id === id) {
        this.setState({chatWith: {...this.state.chatWith, isOnline: false}})

      }
  }

  Submit(e) {
    e.preventDefault()
    const message = {
      from: {_id: this.props.user._id, pic: this.props.user.pic, name: this.props.user.name},
      message: e.target.value,
      timeStamp: new Date().getTime()
    };
    this.setState({messages: [...this.state.messages, message]})
    if (this.state.chatWith.isGroup) {
      message.grpId= this.state.chatWith._id;
      socket.emit("send-grp-message", {to: {_id: this.state.chatWith._id, name: this.state.chatWith.name}, message});
    } else {
      socket.emit("send-chat-message", {
        to: {_id: this.state.chatWith._id, name: this.state.chatWith.name},
        message
      }, (status) => {
        this.setState({sentMessageStatus: {
          ...this.sentMessageStatus,
          [`${this.state.chatWith._id}`]: status
        }});
      });
    }
    e.target.value=""
  }

  clickHandler(user) {
    socket.emit('getChatHistory', {userId: this.props.user._id, chatWith: user._id});
    if (user.newMessage) {
      socket.emit('message-seen', user._id);
      delete user.newMessage;
    }
    
    this.setState({chatWith: user});
    this.setState({messages:[]})
  };

  clickGroupHandler(grp) {
    socket.emit('getGroupChatHistory', { _id: grp.chatroom});
    delete grp.newMessage;
    this.setState({chatWith: {_id: grp.chatroom, name: grp.name, isGroup: true}});
    this.setState({messages:[]})
  };

  createGroup(users) {
    console.log(users);
    const ids = users.map(user => user._id);
    socket.emit('createchatgroup', ids);
  };

  closeChatWindow() {
    this.setState({chatWith: ''})
  }

  render() {
    return (
      this.props.user &&
    <div>
      <OnlineUserWindow
        clickGroupHandler={this.clickGroupHandler}
        groupChats={this.state.groupChats}
        users={this.state.onLineUsers}
        clickHandler={this.clickHandler}
        createGroup={this.createGroup}
        leaveGroup={this.leaveGroup}
        deleteGroup={this.deleteGroup}
      />
      <ChatWindow
        myid={this.props.user._id}
        user={this.state.chatWith}
        messages={this.state.messages}
        handleEnter={this.Submit}
        closeChatWindow={this.closeChatWindow}
        sentMessageStatus={this.state.sentMessageStatus && this.state.sentMessageStatus[`${this.state.chatWith._id}`]}
      />
    </div>
    )
  }
}



export default Chat;