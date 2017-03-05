import React, { Component } from 'react';
import { colors } from '../colors';
import { browserHistory } from 'react-router';

const styles = {
  menu: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    display: 'flex'
  },
  item: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `5px solid ${colors.grayBorder}`
  },
  selected: {
    borderTop: `5px solid ${colors.darkBlue}`
  }
};

const items = [
  {
    label: 'Bookings',
    style: {
      borderRight: `1px solid ${colors.navBorder}`
    },
    path: '/admin'
  },
  {
    label: 'Products',
    style: {
      borderRight: `1px solid ${colors.navBorder}`
    },
    path: '/admin/products'
  },
  {
    label: 'History'
  }
]

export default class Admin extends Component {

  state = {
    selected: 0
  }

  onSelectMenuItem = (index, path) => {

    if (path) {
      browserHistory.push(path);
    }

    this.setState({
      selected: index
    });
  }

  render() {
    const { children } = this.props;
    const { selected } = this.state;

    return (
      <div>
        { children }
        <div style={styles.menu}>
          {
            items.map((item, index) => (
              <div
                key={index}
                style={{ ...styles.item, ...(index === selected && styles.selected), ...item.style}}
                onClick={() => this.onSelectMenuItem(index, item.path)}
              >
                { item.label }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
