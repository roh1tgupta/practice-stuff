import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';
import { callApiSignin } from '../../api'


const Signin = () => {
  const abc = useParams();
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
    console.log(abc, state, history);

      history.push('/')
    }
  },[])

  const postData = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
      setEmail('');
      return;
    }

    callApiSignin(password, email).then(data => {
      console.log(data);
      if (data.error) {
        M.toast({html: data.error, classes:"#c62828 red darken-3"});
        setPassword('');
        setEmail('');
      } else {
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch({type:"USER", payload: data.user})
        M.toast({html: "logged in successfully", classes:"#43a047 green darken-1"});
        history.push('/')
      }
    }).catch(err => console.log(err))
  }
  

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />

      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => postData()}>
        Login
      </button>
      <h5>
        <Link to="/signup">Don't have an account?</Link>
      </h5>
      <h6>
        <Link to="/reset">Forgot password?</Link>
      </h6>
      </div>
    </div>
  )
}

export default Signin;