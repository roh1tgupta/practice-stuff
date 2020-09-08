import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import  Login  from './Login';
import  LoginState  from '../components/LoginState';
class ReduxLoginState extends React.Component {
  render() {
    return (
      <div>
       <Router>
         <div>
          <h2> Welcome to React </h2>
          <ul>
         
            <li><Link to={'/reduxLogin/login'}>Login</Link></li>
            <li><Link to={'/reduxLogin/state'}>Stored State</Link></li>
            <hr/>
          </ul>
          <Switch>
            <Route exact path='/reduxLogin/login' component={Login} />
            <Route exact path='/reduxLogin/state' component={LoginState} />
          </Switch>
        </div>
       </Router>        
      </div>
    )}
}

export default ReduxLoginState;