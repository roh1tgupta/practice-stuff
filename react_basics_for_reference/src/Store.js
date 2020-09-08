import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/reducer';
import thunk from 'redux-thunk';

var store = createStore(todoApp, applyMiddleware(thunk));

export default store;