export const ADD_TODO = 'ADD_TODO'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
export const PAGINATED_INFO = 'PAGINATED_INFO'

let nextTodoId = 0;

export function addTodo(text) {
   return {
      type: ADD_TODO,
      id: nextTodoId++,
      text
   };
}

export function loginResponse(obj) {
  return {
     type: LOGIN_RESPONSE,
     obj
  };
}

export function paginatedInfo(res) {
  return {
    type: PAGINATED_INFO,
    res
  }
}

export function todoWithMiddleware(text) {
  return dispatch => setTimeout(() => dispatch(addTodo(text)), 2000);

}