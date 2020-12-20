import './App.css';
import React, { useState } from 'react';
import TodoList from './TodoList';
import Nav from './Nav';
import AddTodo from './AddTodo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { firstReducer } from './reducer';

const store = createStore(firstReducer);
function App() {
  const [count, setCount] = useState('');
  const anyfun = (value) => {
    console.log(value)
    setCount(value);
  }
  return (
    <div className="App">
      <Provider store={store}>
        <Nav value={count}></Nav>
        <AddTodo></AddTodo>
        <TodoList anyfun={(value) => anyfun(value)}></TodoList>
      </Provider>
    </div>
  );
}

export default App;
