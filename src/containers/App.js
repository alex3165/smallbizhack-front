import React, { Component } from 'react';

const styles = {
  container: {
    backgroundColor: '#f3f3f3',
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
