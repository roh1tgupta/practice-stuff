import React from 'react';
import logo from './logo.svg';
import './App.css';
// import UseContextComp from './Components/reacthooks/UseContextComp';
// import UseDeferredValueComp from './Components/reacthooks/UseDeferredValueComp';
// import UseImperativeHandleComp from './Components/reacthooks/UseImperativeHandleComp';
// import UseTransitionComp from './Components/reacthooks/UseTransitionComp';
import { Suspense } from 'react';

const UseDeferredValueComp = React.lazy(() => import('./Components/reacthooks/UseDeferredValueComp'));
const UseImperativeHandleComp = React.lazy(() => import('././Components/reacthooks/UseImperativeHandleComp'));
const UseTransitionComp = React.lazy(() => import('./Components/reacthooks/UseTransitionComp'));
const UseContextComp = React.lazy(() => import('././Components/reacthooks/UseContextComp'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading..</div>} > 
      {/* <UseContextComp /> */}

      <UseDeferredValueComp />
      {/* <UseImperativeHandleComp /> */}
      {/* <UseTransitionComp /> */}
      </Suspense>
    </div>
  );
}

export default App;
