import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';  // for code spiliting ..npm i react-loadable

import App from './App';
import RefEx from './routes/Refex';
// import Home from './routes/Home';

import Forms from './routes/Forms';
import Clock from './routes/Clock';
import Toggle from './routes/Toggle';
import ReduxEx from './routes/ReduxEx';
import ReduxLoginState from './routes/ReduxLoginState';
import Pagination from './routes/Pagination';
import PaginationWithServer from './routes/PaginationWithServer';
import Stack from './routes/Stack';
import ForwardingRef from './routes/ForwardingRef';
import ContextDemo from './routes/context/contextDemo';
import MouseTracker from './routes/renderProps/MouseTracker';
import { Parent } from './routes/portal/Portal';
import HigherOrderComponent from './routes/higherOrderComponent/HigherOrderComponent';
import ThrottleDebounce from './routes/ThrottleDebounceComponent';


// ./routes/higherOrderComponent/HigherOrderComponent';

class Main extends React.Component {
  render() {
  const Loading = () => <div>Loading...</div>;
	const Home = Loadable({
		loader: () => import('./routes/Home'),
		loading: Loading,
	});

    return (
      <div>
       <Router>
         <div>
          <h2> Welcome to React </h2>
          <ul>
            <li><Link to={'/home/1/2'}>Home</Link></li>
            <li><Link to={'/app'}>Object and Array</Link></li>
            <li><Link to={'/refs'}>Reference Example</Link></li>
            <li><Link to={'/forms'}>Forms</Link></li>
            <li><Link to={'/clock'}>Clock</Link></li>
            <li><Link to={'/toggle'}>Toggle Ex</Link></li>
            <li><Link to={'/reduxEx'}>Redux Example</Link></li>
            <li><Link to={'/reduxLogin'}>Redux Storing Example</Link></li>
            <li><Link to={'/simplepagination'}>Simple Pagination Ex</Link></li>
			      <li><Link to={'/paginationWithServer'}>Pagination With Server</Link></li>
            <li><Link to={'/stack'}>Rendering Html Element Dynamically </Link></li>
            <li><Link to={'/forwardingref'}>Forwarding Ref</Link></li>
            <li><Link to={'./contextapi'}>Context API</Link></li>
            <li><Link to={'./renderprops'}>Render Props and Image</Link></li>
            <li><Link to={'./portal'}>Portal</Link></li>
            <li><Link to={'./hoc'}>Higher Order Component</Link></li>
            <li><Link to={'./throttle-debounce'}>Throttleing and Debouncing</Link></li>
            <hr/>
          </ul>
          <Switch>
            <Route exact path='/home/:id/:id2' component={Home} />
            
            <Route exact path='/app' component={App} />
            <Route exact path='/refs' component={RefEx} />
            <Route exact path='/forms' component={Forms} />
            <Route exact path='/clock' component={Clock} />
            <Route exact path='/toggle' component={Toggle} />
            <Route exact path='/reduxEx' component={ReduxEx} />
            <Route exact path='/reduxLogin' component={ReduxLoginState} />
            <Route exact path='/simplepagination' component={Pagination} />
			      <Route exact path='/paginationWithServer' component={PaginationWithServer} />
            <Route exact path='/stack' component={Stack} />
            <Route exact path='/forwardingref' component={ForwardingRef}></Route>
            <Route exact path='/contextapi' component={ContextDemo}></Route>
            <Route exact path='/renderprops' component={MouseTracker}></Route>
            <Route exact path='/portal' component={Parent}></Route>
            <Route exact path='/hoc' component={HigherOrderComponent}></Route>
            <Route exact path='/throttle-debounce' component={ThrottleDebounce}></Route>

          </Switch>
        </div>
       </Router>   
      </div>
    )}
}

export default Main;