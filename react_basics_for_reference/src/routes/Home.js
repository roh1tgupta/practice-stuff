import React  from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick =  this.handleClick.bind(this);
  }
  handleClick(a, b) {
    console.log("clicked......", a, b);
  }
  render () {
  const ab = "&lt; 2";

    return  (
      <div>
        <h2>Home</h2>
        {this.props.match && (
          <React.Fragment>
          <h1>first param : {this.props.match.params.id}</h1>
          <h1>Second param : {this.props.match.params.id2}</h1>
          <button onClick={this.handleClick.bind(this, 2)} >click me</button>
          <button onClick={() => this.handleClick(2)} >click me1</button>

          <button onClick={(e) => this.handleClick(2, e)} >click me 2</button>
          <button onClick={this.handleClick} >click me 3</button>
          <div>&lt; 2</div>
          <div>ab {ab}</div>



          </React.Fragment>
        )}
	
         { this.props.children && <div className={this.props.className}> {this.props.children }</div>
         }
      </div>
    ) 
  }
  
}

export default Home;