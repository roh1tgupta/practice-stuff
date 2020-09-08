import React from 'react';
import ReactDOM from 'react-dom';
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import todoApp from './reducers/reducer'

import './index.css';
import Main from './MainApp';
import registerServiceWorker from './registerServiceWorker';

import store from './Store';
//let store = createStore(todoApp)

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
<Provider store = {store}>
  <Main />
</Provider>, document.getElementById('root'));

registerServiceWorker();
