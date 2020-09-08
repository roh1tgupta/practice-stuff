import React from 'react';
import { connect } from 'react-redux';

import { addTodo, todoWithMiddleware } from '../actions/action'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

class ReduxEx extends React.Component {
  render() {
    const { dispatch, visibleTodos } = this.props;
    return ( 
      <div>
        <AddTodo
          onAddClick = {text => dispatch(addTodo(text))}
          onAddClickWiththunk = {text => dispatch(todoWithMiddleware(text))}
        />
        <TodoList todos = {visibleTodos}/>
      </div>
    );
  }
}

function select(state) {
  return {
     visibleTodos: state.todos
  }
}

export default connect(select)(ReduxEx);