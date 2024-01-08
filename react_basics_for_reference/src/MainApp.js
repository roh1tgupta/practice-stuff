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
import GraphqlComp from "./routes/GraphqlComp";
import Geolocation from './routes/GeoLocation';
import DragAndDrop from './routes/DragAndDrop';
import WebWorker from './routes/WebWorker';
import SharedWebWorker from './routes/SharedWebWorker';
import SharedWebWorker1 from './routes/SharedWebWorker1';


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
            <li><Link to={'./graphqleg'}>Graphql(check console)</Link></li>
            <li><Link to={'./geolocationapi'}>Geolocation api(html5)</Link></li>
            <li><Link to={'./draganddrop'}>Drag and Drop(html5)</Link></li>
            <li><Link to={'./webworker-dedicated'}>Dedicated Web worker simple example(html5)</Link></li>
            <li><Link to={'./webworker-shared'}>Shared Web worker first comp </Link></li>
            <li><Link to={'./webworker-shared1'}>Shared Web worker 2nd comp</Link></li>

            <hr/>
          </ul>
          <Switch>
            <Route exact path='/home/:id/:id2' component={Home} />
            
            <Route exact path='/app' component={App} />
            <Route exact path='/refs' component={RefEx} />
            <Route exact path='/forms' component={Forms} />
            <Route exact path='/clock' component={() => <Clock arr={[1,2,3,4,5]}/>} />
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
            <Route exact path='/graphqleg' component={GraphqlComp}></Route>
            <Route exact path='/geolocationapi' component={Geolocation}></Route>
            <Route exact path='/draganddrop' component={DragAndDrop}></Route>
            <Route exact path='/webworker-dedicated' component={WebWorker}></Route>
            <Route exact path='/webworker-shared' component={SharedWebWorker}></Route>
            <Route exact path='/webworker-shared1' component={SharedWebWorker1}></Route>

          </Switch>
        </div>
       </Router>   
      </div>
    )}
}

export default Main;