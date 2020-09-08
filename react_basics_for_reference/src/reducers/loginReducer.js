
import { LOGIN_RESPONSE } from '../actions/action'


function loginInfo(state, action) {
  if(!state)
    state = null
   switch (action.type) {
      case LOGIN_RESPONSE:
         return action.obj
      default:
         return state
   }
}

export default loginInfo