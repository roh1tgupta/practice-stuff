import React, { useReducer } from 'react';

const initialState = {
    item: []
}

const ADD_ITEM = 'ADD_ITEM';

function reducer(state = initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case ADD_ITEM: 
            return { ...state, item: [...state.item, action.item]};
        default:
            return state;
    }
}

export default function() {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state, "...state")
    return <div>
        <button onClick={() => dispatch({
            type: ADD_ITEM,
            item: 'hey, hello there!'
        })}> add item </button>
        {state.item.map((itm, ind) => <div key={`item${ind}`}>{itm}</div>)}
    </div>
}