import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import Template from '../Template/Template';
import Home from '../home';

export default class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 'Home'};
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  changeState(name) {
    this.props.changeState(name);
    this.setState({currentPage: name})
  }
  
   componentWillMount() {
   // this.props.changeState('Home');
   this.handleBackButton();
    window.onpopstate = (event) => {
      this.handleBackButton(event);
    };
  }

  handleBackButton(event) {
   // console.log(window.location.pathname)
    if(window.location.pathname.indexOf('home') > -1) {
      this.setState({ currentPage: 'Home' });
      this.props.changeState('Home');
    } else if (window.location.pathname.indexOf('react') > -1) {
      this.props.changeState('Reactjs');
      this.setState({ currentPage: 'Reactjs' });
    } else if (window.location.pathname.indexOf('jest') > -1) {
      this.props.changeState('Jest');
      this.setState({ currentPage: 'Jest' });
    } else if (window.location.pathname.indexOf('miscellaneous') > -1) {
      this.props.changeState('Miscellaneous');
      this.setState({ currentPage: 'Miscellaneous' });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="navbar">
            <Link className={`routerLink ${this.state.currentPage === 'Home' ? 'activeLink' : ''}`}
              to='/home' onClick={() => this.changeState('Home')}>
              Home
            </Link>
            <Link className={`routerLink ${this.state.currentPage === 'Reactjs' ? 'activeLink' : ''}`}
              to='/react-tutorial' onClick={() => this.changeState('Reactjs')}>
              Reactjs
            </Link>
            <Link className={`routerLink ${this.state.currentPage === 'Jest' ? 'activeLink' : ''}`}
              to='/jest' onClick={() => this.changeState('Jest')}>
              Jest
            </Link>
            <Link className={`routerLink ${this.state.currentPage === 'Miscellaneous' ? 'activeLink' : ''}`}
              to='/miscellaneous' onClick={() => this.changeState('Miscellaneous')}>
              Miscellaneous
            </Link>
          </div>
          <Switch>
            <Route path='/jest' component={Template}/> {/* dont use here exact otherwise it wont render*/ }
            <Route path='/react-tutorial' component={Template} />
            <Route path='/miscellaneous' component={Template} />
            <Route path='/home' component={Home} />
            <Redirect exact from='/' to='/home'/>
          </Switch>
        </div>    
      </BrowserRouter>
    );
  }
}
