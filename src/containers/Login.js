import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import image from '../home.jpg';

const styles = {
  background: {
    maxHeight: '100vh'
  },
  up: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  login: {
    width: '80%',
    height: 50,
    margin: 'auto',
    backgroundColor: 'rgb(59, 89, 152)',
    border: 'none',
    fontSize: 16,
    color: 'white',
  },
  title: {
    color: 'white',
    width: '80%',
    margin: 'auto'
  }
}

export default class Login extends Component {

  render() {
    return (
      <div>
        <img src={image} style={styles.background}/>
        <div style={styles.up}>
          <h1 style={styles.title}>Find products from local shops nearby</h1>
          <button style={styles.login} onClick={() => browserHistory.push("/merchants")}>Login</button>
        </div>
      </div>
    );
  }
}
