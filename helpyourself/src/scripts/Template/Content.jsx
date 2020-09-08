import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AboutReact from './reactTutorialContent/aboutReact';
import AboutJest from './jestContent/aboutJest';
import InstallAndGettingStarted from './jestContent/installingAndGettingStarted';
import Matchers from './jestContent/matcher';
import AsynchronousCode from './jestContent/aysnchronousCode';
import MockingFunctions from './jestContent/mockingFunctions';
import SetupAndTeardown from './jestContent/setupAndTeardown';

import SetupAndHelloWorld from './reactTutorialContent/setupAndHelloWorld';
import JSX from './reactTutorialContent/JSX';
import ElementsAndRendering from './reactTutorialContent/elementsAndRendering';
import Components from './reactTutorialContent/components';
import Props from './reactTutorialContent/props';
import State from './reactTutorialContent/state';
import LifeCycle from './reactTutorialContent/lifeCycle';
import EventsHandling from './reactTutorialContent/eventsHandling';
import RefsAndKeys from './reactTutorialContent/refsAndKeys';
import Forms from './reactTutorialContent/forms';
import Context from './reactTutorialContent/context';
import ErrorBoundary from './reactTutorialContent/errorBoundary';
import Fragments from './reactTutorialContent/fragments';
import Routing from './reactTutorialContent/routing';
import HigherOrderComponents from './reactTutorialContent/higherOrderComponents';
import ReactjsHooks from './reactTutorialContent/reactjsHooks'; 

import ES6 from './miscellaneous/ES6';
import Closure from './miscellaneous/Closure';
import Newjs from './miscellaneous/newjs';
import ReduceInJs from './miscellaneous/ReduceInJs';

export default function Sidebar (props) {
  return (<div className="content">
  {/* main content */}
  {
    <Switch>
            <Route exact path='/react-tutorial/aboutreact' component={AboutReact} />
            <Route exact path='/react-tutorial/setup' component={SetupAndHelloWorld} />
            <Route exact path='/react-tutorial/jsx' component={JSX} />
            <Route exact path='/react-tutorial/elements&rendering' component={ElementsAndRendering} />
            <Route exact path='/react-tutorial/component' component={Components} />
            <Route exact path='/react-tutorial/props' component={Props} />
            <Route exact path='/react-tutorial/state' component={State} />
            <Route exact path='/react-tutorial/lifecycle' component={LifeCycle} />
            <Route exact path='/react-tutorial/eventhandling' component={EventsHandling} />
            <Route exact path='/react-tutorial/refs&keys' component={RefsAndKeys} />
            <Route exact path='/react-tutorial/forms' component={Forms} />
            <Route exact path='/react-tutorial/context' component={Context} />
            <Route exact path='/react-tutorial/errorboundary' component={ErrorBoundary} />
            <Route exact path='/react-tutorial/fragments' component={Fragments} />
            <Route exact path='/react-tutorial/routing' component={Routing} />
            <Route exact path='/react-tutorial/higherordercomponents' component={HigherOrderComponents} />
            <Route exact path='/react-tutorial/hooks' component={ReactjsHooks} /> 
            <Redirect exact from='/react-tutorial' to='react-tutorial/aboutreact' component={AboutReact} />
            
            <Redirect exact from='/jest' to='jest/aboutjest' component={AboutJest} />
            <Route exact path='/jest/aboutjest' component={AboutJest} />
            <Route exact path='/jest/installandgettingstarted' component={InstallAndGettingStarted} />
            <Route exact path='/jest/matchers' component={Matchers} />
            <Route exact path='/jest/asynchronouscode' component={AsynchronousCode} />
            <Route exact path='/jest/mockingfunctions' component={MockingFunctions} />
            <Route exact path='/jest/setupandteardown' component={SetupAndTeardown} />

            <Redirect exact from='/miscellaneous' to='miscellaneous/es6' component={ES6} />
            <Route exact path='/miscellaneous/es6' component={ES6} />
            <Route exact path='/miscellaneous/closure' component={Closure} />
            <Route exact path='/miscellaneous/newjs' component={Newjs} />
            <Route exact path='/miscellaneous/.reduceinjs' component={ReduceInJs} />
      </Switch>
  }
    </div>);
}