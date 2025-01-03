//  createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByValye: (state, action) => {
            state.value += action.payload
        }
    }
})


// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByValye } = counterSlice.actions


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// However, using thunks requires that the redux-thunk middleware 
// (a type of plugin for Redux) be added to the Redux store when it's created. 
// Fortunately, Redux Toolkit's configureStore function already sets that up for us automatically,
//  so we can go ahead and use thunks here.
export const incrementAsync = amount => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByValye(amount))
    }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state?.counter?.value


export default counterSlice.reducer