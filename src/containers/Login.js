import React, { Component } from 'react';
import { browserHistory } from 'react-router'

export default class Login extends Component {

  render() {
    return (
      <div>
        <button class="login" onClick={() => browserHistory.push("/merchants")} >Login</button>
      </div>
    );
  }
}
