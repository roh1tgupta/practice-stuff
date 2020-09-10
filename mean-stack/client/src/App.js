import React, {useEffect, createContext, useReducer, useContext, Suspense } from 'react';
import './App.css';
import NavBar from './Components/Navbar'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Home from './Components/screens/Home';
import Signup from './Components/screens/Signup';
import Login from './Components/screens/Signin';
import Reset from './Components/screens/Reset';
import Profile from './Components/screens/Profile';
import CreatePost from './Components/screens/CreatePost';
import { reducer, initialState } from './reducers/useReducer';
import UserProfile from './Components/screens/UserProfile';
import SubscribedUserPost from './Components/screens/subscribesUserPost';
import NewPassword from './Components/screens/NewPassword';
import Myposts from './Components/screens/Myposts';

const Chat = React.lazy(() => import('./Components/Chatwindow/Chat'));

export const UserContext = createContext();

const Routing = (prop) => {
  const history = useHistory();
  const {dispatch} = useContext(UserContext);

  useEffect(() => {
    if (!prop.user || Object.keys(prop.user).length === 0) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        dispatch({type:"USER", payload: user})
      } else {
        if (!history.location.pathname.startsWith('/reset')) {
          history.push('/signin')
        }
      }
    }
    
  }, [prop])

  return (
    <Switch>
        <Route path='/signin' >
          <Login />
        </Route>
        <Route path='/signup' >
          <Signup />
        </Route>
        <Route exact path='/profile' >
          <Profile />
        </Route>
        {/* <Route path='/create' >
          <CreatePost />
        </Route> */}
        <Route path='/profile/:userid' >
          <UserProfile />
        </Route>
        <Route path='/myfollowingpost' >
          <SubscribedUserPost />
        </Route>
        <Route exact path='/reset' >
          <Reset />
        </Route>
        <Route path='/reset/:token' >
          <NewPassword />
        </Route>
        <Route path='/myposts'>
          <Myposts />
        </Route>
        <Route path='/' >
          <Home />
        </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing user={state} />
      {state && state._id && 
        <Suspense fallback={<div>Loading...</div>}>
          <Chat user={state} />
        </Suspense>}
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
