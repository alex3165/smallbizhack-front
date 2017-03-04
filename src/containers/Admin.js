import React, { Component } from 'react';

export default class Admin extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        { children }
      </div>
    );
  }
}
