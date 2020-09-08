import { connect } from 'react-redux';
import React, { Component } from 'react'

class LoginState extends Component {
   render() {
     const { userInfo } = this.props;
     if (!userInfo) { 
        return (<div> You are not logged in. Please login </div>)
     }
      return (
        <table>
          <tbody>
          <tr>
            <th>Name</th><th>Address</th><th>Occupation</th><th>Age</th>
          </tr>
          <tr>
            <td>{userInfo.name}</td><td>{userInfo.address}</td><td>{userInfo.occupation}</td><td>{userInfo.age}</td>
          </tr>
          </tbody>
        </table>
      )
   }
}

function select(state) {
  return { userInfo : state.loginInfo }
}
export default connect(select)(LoginState)