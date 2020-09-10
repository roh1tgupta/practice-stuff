import React, { useState, useEffect } from 'react';
import online from '../../icons/online.jpg';

import './CreateGroupChat.css';

const CreateChat = ({users, createGroup: createFn}) => {
  const [search, setSearch] =  useState('');
  const [selectedUser, setSelectedUser] = useState([]);

  const createGroup = () => {
    if (selectedUser.length > 0) {
      setSelectedUser([]);
      setSearch('');
      createFn(selectedUser);
    }
  }

  const selectUser = (item) => {
    if (selectedUser.includes(item)) {
      return;
    }
    setSelectedUser([...selectedUser, item]);
  }
  return (
    <React.Fragment>
      <div className="modal-content">
        <input type="text"
          placeholder="search user"
          style={{height:"unset"}}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul className="collection">
          {
            selectedUser.length > 0 && (
              <div className="selectedUsers">
                <div>
                  <li className="collection-item" style={{justifyContent:"center"}}>
                    Selected User 
                  </li>
                </div>
                
                {
                    selectedUser.map(item => {
                      return (
                        <div
                          onClick={() => {
                            const updateSelectedUser = selectedUser.filter(user => user._id !== item._id);
                            setSelectedUser([...updateSelectedUser])
                          }}
                          key={item._id}
                        >
                          <li className="collection-item">
                            <div className="user-list-img">
                              <img src={item.pic} alt="user"/>
                            </div>
                            <div className="user-list-name">{item.name}</div>
                            <div className="user-list-img">
                              <i class="material-icons" style={{color:"green"}}>check</i>
                            </div>
                          </li>
                        </div>
                      )})
                }
              </div>
            )
          }
          <div className="availableUsers">
            <div>
              <li className="collection-item" style={{justifyContent:"center"}}>
                Available Users 
              </li>
            </div>
            {
              users.length > 0 ? users.filter(user => user.name.includes(search)).map(item => {
              return (
                <div
                  onClick={() => selectUser(item)}
                  key={item._id}
                >
                  <li className="collection-item">
                    <div className="user-list-img">
                      <img src={item.pic} alt="user"/>
                    </div>
                    <div className="user-list-name">
                      {item.name}
                    </div>
                    <div className="user-list-img">
                      { item.isOnline ? <img src={online} alt="user"/> : (
                        <div className="offline"></div>
                      )}
                    </div>
                  </li>
                </div>
              )}) : <div onClick={() =>{}}>
                <li className="collection-item">
                  No user found
              </li>
            </div>
            }
          </div>
          
        </ul>   
        <button 
          style={{marginTop: "10px"}}
          className="modal-close waves-effect waves-green btn-flat"
          onClick={() => createGroup()}
        >
          Create
        </button>
      </div>
      
      {/* <div className="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div className="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div> */}
    </React.Fragment>
  );
}

export default CreateChat;