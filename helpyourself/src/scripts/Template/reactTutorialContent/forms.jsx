import React from 'react';

export default function Forms () {
  return (
    <div>
      <h3>Forms</h3>
      <p>In React Form is handled by two ways, either by Controlled 
        commponent or by uncontrolled component.
        In controlled one, form data is handled by 
        a React component, and in other one form 
        data is handled by the DOM itself. </p>
      <h3>Controlled Component</h3> 
      In this type, React State are the 'single source of truth'.
      <pre className='code'>
      {
`class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}`
      }
      </pre> 
      As the value attribute is always set in the Form component,
      displayed value will be this.state.value, making React State single
      source of truth.
      In controlled component,
      every state mutation will have an associated handler function.
      here handleChange runs on every keystroke to update the 
      React state, the displayed value will update as the user types.
      In React form Element like {`<input> <textarea> and <select>`} can
      be used in controlled way.
      When there is need of handling multiple contolled input elements,
      name attribute can be added to each element(below example).
      <pre className="code">
      {
`class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}`
      }</pre>
      <h3>Uncontrolled Component</h3>
      Here form data is handled by DOM itself and refs are used to get  form values from DOM.
      <pre className="code">
        {
`class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}`
        }
      </pre>
      Sometime it is requirement to specify initial value but leave futher updates uncontrolled,
      to handle such cases, default attribute is used.
      <pre className="code">
        {
`render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
`
        }
      </pre>
      Likewise, {'<input type="checkbox">'} and {'<input type="radio">'} support defaultChecked.

      In React, an {'<input type="file" />'} is always an uncontrolled component because 
      its value can only be set by a user, and not programmatically. 
      <pre className="code">
        {
`class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  
  handleSubmit(event) {
    event.preventDefault();
    alert(
      \`Selected file-\${
        this.fileInput.current.files[0].name
      }\`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
`  
        }
      </pre>
    </div>
  );
}