import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import image from '../home.jpg';
import logo from '../logo-white.svg';

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
    flexDirection: 'column',
    alignItems: 'center'
  },
  login: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
    height: 52,
    margin: 'auto',
    backgroundColor: 'rgb(59, 89, 152)',
    border: 'none',
    fontSize: 16,
    color: 'white',
  },
  title: {
    flex: 6,
    color: 'white',
    width: '80%',
    alignItems: 'center',
    display: 'flex'
  },
  bottomLine: {
    flex: 2,
    width: '80%'
  },
  imgContainer: {
    flex: 3,
    width: '80%',
    display: 'flex',
    alignItems: 'flex-end'
  }
}

export default class Login extends Component {

  render() {
    return (
      <div>
        <img src={image} style={styles.background}/>
        <div style={styles.up}>
          <div style={styles.imgContainer}>
            <img src={logo} style={{ width: '100%' }}/>
          </div>
          <h1 style={styles.title}>Find products from local shops nearby</h1>
          <div style={styles.bottomLine}>
            <button style={styles.login} onClick={() => browserHistory.push("/merchants")}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}
