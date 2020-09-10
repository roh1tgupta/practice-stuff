// const Chat = (prop) => {
//   const [showChat, setShowChat] = useState(false);
//   const [onLineUsers, setOnLineUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [chatWith, setChatWith] = useState('');
//   const messageContainer = useRef();
//   const [isConnected, setConnected] = useState(!!prop.user);
//   const [groupChats, setGroupChats] = useState([]);

//   useEffect(() => {
//     if(prop.user) {
//       setConnected(true);

//       socket.on('chatHistory', chatHistory => {
//         // console.log(chatHistory.chats);
//         setMessages(chatHistory.chats)
//       })
    
//       socket.on('addedingrpchat', obj => {
//         setGroupChats([...groupChats, obj]);
    
//         socket.emit('joingrpchat', obj.chatroom);
//       })
//       socket.on('error', () => {
//         console.log('some error has occurred');
//       })

//       socket.on('online-users', users => {
//         // console.log(users);
//         setOnLineUsers(users)
//       });
    
//       socket.on('group-chats', data => {
//         setGroupChats(data);
//       })
    
//       socket.on('chat-message', data => {
//         setMessages([...messages, data]);
//       })
      
//       socket.on('goingoffline', usr => {
//         const users = onLineUsers.map(user => {
//           if (usr._id === user._id) {
//             return {...user, isOnline: false };
//           }
//           return user;
//         });
//         setOnLineUsers(users);
//         if (chatWith._id === usr._id) {
//           setChatWith({...chatWith, isOnline: false});
//         }
//       })
    
//       socket.on("onlinestatus", id => {
//         const users = onLineUsers.map(user => {
//           if (id === user._id) {
//             return {...user, isOnline: true };
//           }
//           return user;
//         });
//         setOnLineUsers(users);
//         if (chatWith._id === id) {
//           setChatWith({...chatWith, isOnline: true});
//         }
//       })

//       socket.emit('new-user', prop.user);
//     } else {
//       setConnected(false);
//     }

//     return () => {
//       socket.off();
//     };
//   }, [prop.user])  
  
//   const Submit = (e) => {
//     e.preventDefault()
//     const message = {
//       from: {_id: prop.user._id, pic: prop.user.pic, name: prop.user.name},
//       message: e.target.value,
//       timeStamp: new Date().getTime()
//     };
//     setMessages([...messages, message])
//     if (chatWith.isGroup) {
//       socket.emit("send-grp-message", {to: {_id: chatWith._id, name: chatWith.name}, message});
//     } else {
//       socket.emit("send-chat-message", {to: {_id: chatWith._id, name: chatWith.name}, message});
//     }
//     e.target.value=""
//   }

//   const clickHandler = (user) => {
//     socket.emit('getChatHistory', {userId: prop.user._id, chatWith: user._id});
//     setChatWith(user)
//     setMessages('');
//   };

//   const clickGroupHandler = (grp) => {
//     socket.emit('getGroupChatHistory', { _id: grp.chatroom});
//     setChatWith({_id: grp.chatroom, name: grp.name, isGroup: true});
//     setMessages('');
//   };

//   const createGroup =  (users) => {
//     console.log(users);
//     const ids = users.map(user => user._id);
//     socket.emit('createchatgroup', ids);
//   };

//   const closeChatWindow = () => {
//     setChatWith('')
//   }
//   return (
//     isConnected && prop.user &&
//     <div>
//       <OnlineUserWindow
//         clickGroupHandler={clickGroupHandler}
//         groupChats={this.state.groupChats}
//         users={onLineUsers}
//         clickHandler={clickHandler} createGroup={createGroup}
//       />
//       <ChatWindow
//         myid={prop.user._id}
//         user={chatWith} messages={messages} handleEnter={Submit} closeChatWindow={closeChatWindow}/>
//       {showChat &&
//       <>
//         <div id="message-container" ref={messageContainer}> </div>
        
//       </>
//       }
//     </div>
//   )
// }