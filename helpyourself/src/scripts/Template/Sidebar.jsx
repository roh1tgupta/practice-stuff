import React from 'react';
import { Link } from 'react-router-dom';
import { pushToHistory } from '../history';
export default function Sidebar (props) {
  return (
    <div className="sidebar">
         <div>
          { props.match.path === '/react-tutorial' && <div>
            <h2> ReactJs </h2>
          <ul>
            <li><Link className="routerLink" to={`/react-tutorial/aboutreact`} onClick={() => { pushToHistory(`/react-tutorial/aboutreact`)}}>About React</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/setup`} onClick={() => { pushToHistory(`/react-tutorial/setup`)}}>Setting up Environment</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/jsx`} onClick={() => { pushToHistory(`/react-tutorial/jsx`)}}>JSX</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/elements&rendering`} onClick={() => { pushToHistory(`/react-tutorial/elements&rendering`)}}>Elements and rendering</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/component`} onClick={() => { pushToHistory(`/react-tutorial/component`)}}>Components</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/props`} onClick={() => { pushToHistory(`/react-tutorial/props`)}}>Props and States</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/lifecycle`} onClick={() => { pushToHistory(`/react-tutorial/lifecycle`)}}>Lifecycle</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/eventhandling`}>Events Handling</Link></li>
			      <li><Link className="routerLink" to={`/react-tutorial/refs&keys`}>Refs and Keys</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/forms`}>Forms </Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/context`}>Context</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/errorboundary`}>Error Boundary</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/fragments`}>Fragments</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/routing`}>Routing</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/higherordercomponents`}>Higher-Order Components</Link></li>
            <li><Link className="routerLink" to={`/react-tutorial/hooks`}>Hooks</Link></li>
          </ul></div>
        }
        
        { props.match.path === '/jest' && <div><h2> Jest </h2>
          <ul>
            <li><Link className="routerLink" to={`/jest/aboutjest`}>About Jest</Link></li>
            <li><Link className="routerLink" to={`/jest/installandgettingstarted`} >Installing and getting started</Link></li>
            <li><Link className="routerLink" to={`/jest/matchers`} >Matchers</Link></li>
            <li><Link className="routerLink" to={`/jest/asynchronouscode`}>Asynchronous Code</Link></li>
            <li><Link className="routerLink" to={`/jest/mockingfunctions`}>Mocking Functions</Link></li>
            <li><Link className="routerLink" to={`/jest/setupandteardown`}>Setup and Teardown</Link></li>
          
          </ul></div>
        }

        { props.match.path === '/miscellaneous' && <div><h2> Miscellaneous </h2>
          <ul>
            <li><Link className="routerLink" to={`/miscellaneous/es6`}>ES6</Link></li>
            <li><Link className="routerLink" to={`/miscellaneous/closure`}>Closure in js</Link></li>
            <li><Link className="routerLink" to={'/miscellaneous/newjs'}>New Js features</Link></li>
            <li><Link className="routerLink" to={'/miscellaneous/.reduceinjs'}>Array.prototype.reduce() in Js</Link></li>
          </ul></div>
        }
        </div>
    </div>); 
}