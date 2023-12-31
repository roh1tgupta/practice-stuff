import logo from './logo.svg';
import './App.css';
import UseContextComp from './Components/UseContextComp';
import UseDeferredValueComp from './Components/UseDeferredValueComp';
import UseImperativeHandleComp from './Components/UseImperativeHandleComp';
import UseTransitionComp from './Components/UseTransitionComp';


function App() {
  return (
    <div className="App">
      
      {/* <UseContextComp /> */}
      <UseDeferredValueComp />
      {/* <UseImperativeHandleComp /> */}
      {/* <UseTransitionComp /> */}
    </div>
  );
}

export default App;
