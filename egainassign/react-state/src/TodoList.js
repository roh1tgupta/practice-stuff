import React, {useEffect, useState} from 'react';
import Todo from './Todo'
import { connect } from 'react-redux';

const TodoList = (props) => {
    const [todos, setTodos] = useState([
            {
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
              },
              {
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": false
              },
              {
                "id": 3,
                "title": "fugiat veniam minus",
                "completed": false
              },
              {
                "id": 4,
                "title": "et porro tempora",
                "completed": true
              },
              {
                "id": 5,
                "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
                "completed": false
              }
        ])

console.log(props);
    useEffect(() => {
      // props.anyfun(todos.length);
      props.anyfun(props.todoList.length);
    }, [props.todoList.length]);

    return (
        <div>
            {props.todoList && props.todoList.map((todo) => (
                <Todo name={todo.title} key={todo.id}/>
            ))}
        </div> 
    )
}

const mapStateToProp = (state) => {
  return { todoList: state};
}
export default connect((state) => ({todoList: state}))(TodoList);