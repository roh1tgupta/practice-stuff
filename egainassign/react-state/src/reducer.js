export function firstReducer(state = [], action) {
   switch (action.type) {
      case 'ADD_TODO': {
        return [
          ...state, {id: state.length + 1, title: action.value}
        ];
      }
      default: {
        return state;
      }
   }
};
