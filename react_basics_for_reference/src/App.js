import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  render() {
    const headerContent = 'Welcome To React';
    const userName = {
      firstName: 'ramsey',
      laseName: 'Bolten',
      avtarURL: './images/images1.png'
    }

    const clickHandler = () => {
      axios.get('http://localhost:7999/search?productName=iphone12pro',{
        headers: {
          "Accept": "application/json",
          "Accept-Language": "en-US"
        }
      }).then(resp => {
        console.log(resp);
      }).catch(err => {
        console.log(err);
      });
    };
    function ListItem(props) {
      return <li>{props.value}</li>;
    }

    const numbers = [1, 2, 3, 4, 5].map(number => <ListItem key={number.toString()} value={number} />);
    let formatName = (user) => {
      if (user) {
        return user.firstName + ' ' + user.laseName;
      } else {
        return 'stranger';
      }
    }

    const element = (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">{ headerContent }</h1>
      </header>
      <p className="App-intro">
        hello {formatName(userName)} <code>happy coding</code> .
      </p>
      <img src={userName.avtarURL} alt={userName.firstName}/>
      <p className="App-intro">
        hello {formatName()} <code>happy coding</code> {userName.avtarURL}.
      </p>
      <button onClick={() => clickHandler()}>click me</button>

      <div>
        {numbers}
      </div>
    </div> 
    );

    return element ; 
  }

}

export default App;
