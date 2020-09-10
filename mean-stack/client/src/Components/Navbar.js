import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css'

const NavBar = () => {
  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const { state, dispatch } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState([])
  // const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchModal.current)
  },[])

  const renderList = () => {
    if (state && Object.keys(state).length) {
      return [
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        // <li key="3"><Link to="/create">CreatePost</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My following Post</Link></li>,
        <li key="5"><Link to="/myposts">My Post</Link></li>,
        <li key="6">
            <button className="btn waves-effect waves-light #c62828 red darken-3"
              onClick={() => {
                localStorage.clear();
                dispatch({type: "CLEAR"})
              }}
            >
            logout
          </button>
        </li>
      ];
      
    } else  {
      return [
        <li key="7"><Link to="/signin">Login</Link></li>,
        <li key="8"><Link to="/signup">Signup</Link></li>
      ];
    }
  }

  const fetchUsers = (query) => {
    setSearch(query);
    fetch('/search', {
      method:"post",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json()).then(results => {
      console.log(results);
      setUserDetails(results.user)
    })
  } 



  return (
    <nav>
    <div className="nav-wrapper white">
      <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
          <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
              <div className="modal-content">
              <input type="text"
                placeholder="search user"
                value={search}
                onChange={e => fetchUsers(e.target.value)} />
                <ul className="collection">
                  {
                    userDetails.length > 0 && state && userDetails.map(item => {
                    return <Link to={item._id === state._id ? '/profile' : `/profile/${item._id}`} onClick={() =>{
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch('');
                    }}><li className="collection-item">{item.email}</li></Link>
                    })
                  }
                </ul>                        
              </div>
              <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat"
                onClick={()=>setSearch('')}>Close</button>
              </div>
          </div>
    </div>
  </nav>
  );
}

export default NavBar;
