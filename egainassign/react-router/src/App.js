import './App.css';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import Shop from './Shop';
import Shopitem from './ShopItem';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/app">
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route path="/shop" component={Shop}/>

          {/* <Route exact path="/shop" component={Shop}/>
          <Route exact path="/shop/item/:name" component={Shopitem}/> */}

        </Switch>
        {/* <Home></Home>
        <About></About>
        <Shop></Shop> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
