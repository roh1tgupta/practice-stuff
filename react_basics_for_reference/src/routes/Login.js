import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import fire from '../config/fire';
//import request from "../../node_modules/superagent/superagent";
import { loginResponse } from '../actions/action';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      password: ''
    }
    this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
    this.handleClickUserid = this.handleClickUserid.bind(this);
    this.handleClickPassword = this.handleClickPassword.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  
  isUserLoggedIn() {
    const { userLoggedIn } = this.props;
    return userLoggedIn;
  }

  handleClickUserid(event) {
    let userid = event.target.value;
    this.setState({userid});
  }

  handleClickPassword(event) {
    let password = event.target.value;
    this.setState({password});
  }

  formSubmit() {
    const { dispatch } = this.props;
      const { userid, password } = this.state;
   /*   request.post('http://localhost:3000/login')  //for this.....npm install superagent --save
      .set('Content-Type', 'application/json')
      .send({ userid: this.state.userid, password: this.state.password })
      .end(function(err, res){
        console.log(res);
      }); */
        console.log(userid, password);

          axios.post('http://localhost:3000/login/', { userid, password }).then(res => {  //for this method...npm install axios --save
          console.log('responser from server',res.data[0]);
          dispatch(loginResponse(res.data[0]));
          }, () => console.log('err'));

          // fire.auth().createUserWithEmailAndPassword(userid, password).then((res) => {
          //   console.log('....resp from firebase', res);
          // }).catch(function(error) {
          //   // Handle Errors here.
          //   var errorCode = error.code;
          //   var errorMessage = error.message;
          //   console.log('error while saving', error);
          //   // ...
          // });

     /* var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/login', true);
        request.setRequestHeader('Content-Type', 'application/json','Access-Control-Allow-Origin','*');
        request.send(userid, password);   */
  }

  render() {
    //const { dispatch, userLoggedIn } = this.props;
    console.log(this.state.userLoggedIn);
    let content;
    if(this.isUserLoggedIn()) {
      content = ( 
            <div>
            user is already logged in 
            </div>
      )
    }
    else { 
      content = (
        <div> 
          <input type="text" value={this.state.userid} onChange={this.handleClickUserid} placeholder="userid" />
          <input type="password" value={this.state.password} onChange={this.handleClickPassword} placeholder="password" />
          <button onClick={this.formSubmit} > Submit </button>
        </div>
      );
    }

    return content;
  }
}

function login(state) {
  return {
     userLoggedIn: state.loginInfo ? true : false
  }
}
  
export default connect(login)(Login);