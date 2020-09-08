import React from 'react';

export default function Routing () {
  return (
    <div>
      <h3>Routing</h3>
      In React, routing is done by ReactRouter.
      Here our aim is to implement routing in website(somthing that is run on browser).
      Two package would be required : react-router, react-router-dom.
      react-router provides the core routing components and functions for 
      React Router applications. react-router-dom provides environment specific(browser) component and 
      also re-exports all of react-router's exports. So here we only need to install
      react-router-dom.<br />
      <br />
      npm install --save react-router-dom
      <br /> <br />
      <h3>Router Component</h3>
      In the below example, router component i.e. BrowserRouter is imported from 
      react-router-dom package. This component recieves only single child element.
      The &lt;App /&gt; component renders rest of the applications.
      <pre className="code">
        {
`import { BrowserRouter } from 'react-router-dom'

const App = () => (
  <div>
    <Header />
    <Content />
  </div>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
`
        }
      </pre> 

      <h3>Routes</h3>
      Route element let us render content based on location's pathname.
      &lt;Route&gt; expects a path prop, which is string that describes the pathname,
      the route matches, for eg- &lt;Route path="/home" /&gt; should match a pathname
      that begins with /home. if we want to match the pathname exactly then we need to use
      exact props like &lt;Route exact path="/home" /&gt;
      <pre className="code">
        {
`<Route path='/actor'/>
// when the pathname is '/', the path does not match
// when the pathname is '/actor' or '/actor/abc', the path matches
// If you only want to match '/actor', then you need to use
// the "exact" prop. The following will match '/actor', but not
// '/actor/abc'.
<Route exact path='/actor'/>
`
        }
      </pre>
        <br />
      When it comes to matching routes, React Router only cares about the pathname of a location. 
      <br /> <br />
      https://www.abcd.com/home?isLoggedin=false
      <br />
      In the above URL the only part React Router tries to match is /home.
      &lt;Route&gt; can be created anywhere inside of the router.
      &lt;Switch&gt; component is used to group &lt;Route&gt;s. 
      The &lt;Switch&gt; will iterate over its children elements (the routes) and 
      only render the first one that matches the current pathname.

      <pre className="code">
        {
`<Switch>
  <Route exact path='/' component={Home}/>
  <Route exact path='/Actor' component={Actor}/>
</Switch>`
        }
      </pre>
      Now our app needs a link kind of thing to navigate between pages.
      ReactRouter provides &lt;Link&gt; component for this purpose.
      <pre className="code">
      {
`import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Actor'>Actor</Link></li>
      </ul>
    </nav>
  </header>
)`
      }</pre> 

      <h3>Path Params</h3>
      Sometime it is required to capture some variable which are embedded in pathname.
      In the path '/actor/:name', name would be captured and stroed as match.params.name.
      Below is complete example covering all what has been discussed.
      <pre className="code">
      {
`import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
const Home = () => (
  <div>
     <h3> Home page!</h3>
  </div>
);

const Actor = (props) => (
  <div>
    <h3> Actor</h3>
    <h2> actor name: {props.match.params.name}</h3>
  </div>
);

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/actor/xyz'>actor</Link></li>
      </ul>
    </nav>
  </header>
);

const Content = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/actor/:name' component={actor}/>
    </Switch>
  </div>
);

const App1 = () => (
  <div>
    <Header />
    <Content />
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App1 />
  </BrowserRouter>, 
  document.getElementById('root'));  

`
      }</pre>
    </div>
  );
}