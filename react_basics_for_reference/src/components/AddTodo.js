import React, { Component } from 'react'

export default class AddTodo extends Component {
   render() {
      return (
         <div>
            <input type = 'text' ref={ref => this.inputRef = ref} placeholder="reducres example" />
				
            <button onClick = {(e) => this.handleClick(e)}>
               Add
            </button>
            <button onClick = {(e) => this.handleClick(e, 'usingthunk')}>
               Add Using Middleware(thunk)
            </button>
         </div>
      )
   }
   handleClick(e, type = null) {
      const node = this.inputRef;
      const text = node.value.trim();
      if (text === '') return;
      if (type && type === 'usingthunk') {
         this.props.onAddClickWiththunk(text);
      } else {
         this.props.onAddClick(text);
      }
      node.value = '';
   }
}