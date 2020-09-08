import { combineReducers } from 'redux'
import { ADD_TODO, PAGINATED_INFO } from '../actions/action'
import loginInfo from './loginReducer';

function todo(state, action) {
   switch (action.type) {
      case ADD_TODO:
         return {
            id: action.id,
            text: action.text,
         }
      default:
         return state
   }
}
function todos(state = [], action) {
   switch (action.type) {
      case ADD_TODO:
         return [
            ...state,
            todo(undefined, action)
         ]
      default:
         return state
   }
}

function pagination(state = [], action) {
      switch (action.type) {
            case PAGINATED_INFO:
                  if ( action.res.total ) {
                        state.data = action.res.data;
                        state.total = action.res.total[0].total;

                        return state;      
                  } else {
                        return {data : state.data.concat(action.res) ,
                                total : state.total};
                  } 
            default:
                  return state
      }
}
const todoApp = combineReducers({
   todos,
   loginInfo,
   pagination
})
export default todoApp