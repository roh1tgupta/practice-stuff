import React, { unstable_Profiler as Profiler, Component } from 'react'

export default class AddTodo extends Component {
   constructor(props) {
      super(props);
      this.callback1 = this.callback1.bind(this);
   }
   callback1(...params) {
      params.forEach(item => console.log(item));
   }
   render() {
      return (
         <div>
            // profiling
            <Profiler id="Navigation" onRender={this.callback1}>
               <div>
               <input type = 'text' ref={ref => this.inputRef = ref} placeholder="reducres example" />
				
            <button onClick = {(e) => this.handleClick(e)}>
               Add
            </button>
            <button onClick = {(e) => this.handleClick(e, 'usingthunk')}>
               Add Using Middleware(thunk)
            </button>
               </div>
            
            </Profiler>
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