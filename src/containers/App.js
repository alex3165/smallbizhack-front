import React, { Component } from 'react';

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    height: '100vh'
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
