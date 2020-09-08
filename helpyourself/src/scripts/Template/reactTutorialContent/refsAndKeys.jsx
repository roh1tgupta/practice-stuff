import React from 'react';

export default function RefsAndKeys () {
  return (
    <div>
      <h3>Refs</h3>
      Refs gives a way to access DOM nodes or React elements created in the render method.
      These are used by two ways either by React.createRef() API or callbacke refs.
      <pre className='code'>
        {
          `// using React.createRef()
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }
          
  render() {
    // tell React that we want to associate the <input> ref
    // with the 'textInput' that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput}
        />
          
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
          `
        }
      </pre>
      When ref is passed to element in render,
      a reference to the node becomes accessible at the current attribute of the ref.
      When the ref attribute is used on an HTML element, the ref created in the 
      constructor with React.createRef() receives the underlying DOM element as its current property.
      When the ref attribute is used on a custom class component, the ref object 
      receives the mounted instance of the component as its current.
      <br />
      <h4>Adding ref to class component</h4>
      <pre className="code">
        {
          `class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
          
  componentDidMount() {
    this.textInput.current.focusTextInput();
  }
          
  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
          
class CustomTextInput extends React.Component {
  // ...
}`
        }
      </pre>
      <h3>Callback Refs</h3>
      Instead of passing a ref attribute created by createRef(),
      a function can be passed. The function receives the React component
        instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.
      <pre className="code">
        {
          `class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);       
    this.textInput = null;      
    this.setTextInputRef = element => {
      this.textInput = element;
    };     
    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }
          
  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }
          
  render() {
    // Use the 'ref' callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
          `
        }
      </pre>
      <h3>Keys</h3>
      A “key” is a special string attribute you need to include when creating lists of elements.
      Keys help React identify which items have changed, are added, or are removed. This helps in improving 
      performance.
      Keys should be given to the elements inside the array to give the elements a stable identity.
      When its not possible to have stable IDs for rendered items, 
      item index may be used as a key as a last resort. 
      Althoug React don’t recommend using indexes for keys if the order of items may change.
      This can negatively impact performance and may cause issues with component state.
      <pre className='code'>
        {
          `function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
          
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);`
        }
      </pre>
      Keys only make sense in the context of the surrounding array.
      A good rule of thumb is that elements inside the map() call need keys and 
      must only Be Unique Among Siblings
      <pre className="code">
        {
         `function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
 
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
 
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}
          
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);`
        }
      </pre>
      Keys serve as a hint to React but they don’t get passed to your components. 
      If you need the same value in your component, pass it explicitly as a prop with a different name.
      <pre className="code">
        {
          `const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title}
  />
);`
        }
      </pre>
    </div>
    
  );
}