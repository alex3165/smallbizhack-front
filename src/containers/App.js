import React, { Component } from 'react';

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    height: '100%'
  }
}

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div style={styles.container}>
        { children }
      </div>
    )
  }
}
