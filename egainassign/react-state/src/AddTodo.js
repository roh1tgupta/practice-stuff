import React from 'react'
import { connect } from 'react-redux';

const AddTodo = ({dispatch}) => {
    const [value, setValue] = React.useState('');
    return(
        <div>
            <input type="text" value={value} onChange={e => setValue(e.target.value)}></input>
            <button onClick={() => dispatch(((value) => ({type: 'ADD_TODO', value}))(value))}>Submit</button>
        </div>
    )
}

export default connect()(AddTodo);