import React, { Component }  from 'react';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textAreaValue: 'this is just for practice..you can wirte anything here' ,
      selectValue: 'coconut' ,
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleChangeTextArea(event) {
    this.setState({textAreaValue: event.target.value});
  }

  handleChangeSelect(event) {
    this.setState({selectValue: event.target.value})
  }

  handleSubmit(event) {
    alert('check console');
    console.log(this.state);
    event.preventDefault();
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
    return  (
      <div>
        <form onSubmit={this.handleSubmit}>
            <h1> here are example of controller Component </h1>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br/>
            <label>
              Essay:
              <textarea placeholder={this.state.textAreaValue} onChange={this.handleChangeTextArea} />
            </label>
            <br/>
            <label>
              Pick your favorite Soda flavor:
              <select value={this.state.selectValue} onChange={this.handleChangeSelect}> 
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </label>
            <br/>
            <label>
              Is going:
              <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Number of guests:
              <input
                name="numberOfGuests"
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        <label>
          input : {this.state.value}
        </label>
        <br/>
        <label>
          textarea : {this.state.textAreaValue}
        </label>
        <br/>
        <label>
          selectvalue : {this.state.selectValue}
        </label>
        <br/>
        <label>
          isgoing : {this.state.isGoing ? 'true' : 'false'}
        </label>
        <br/>
        <label>
          numberOfGuests : {this.state.numberOfGuests}
        </label>
        <h2> Read Only input </h2>
        <input value="hi" readOnly/>
      </div>
    ) 
  }
}

export default Forms;