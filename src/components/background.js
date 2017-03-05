import React, { Component } from 'react';
import britanny from '../britanny.jpg';

const styles = {
  bg: {
    height: 240,
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    zIndex: -1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -1,
    background: 'linear-gradient(to bottom, rgba(255,255,255, 0) 0%,rgba(255,255,255, 1) 100%)',
  },
  children: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    width: '80%',
    margin: 'auto',
    top: 0
  }
}

class Background extends Component {

  state = {
    scroll: 0
  }

  componentWillMount() {
    window.addEventListener('scroll', this.listener);
  }

  listener = () => {
    this.setState({
      scroll: document.body.scrollTop
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listener);
  }

  render() {
    const { scroll } = this.state;
    const { children } = this.props;

    const opacity = 1 - (scroll / 160);
    console.log(opacity);

    return (
      <div style={styles.bg}>
        <img src={britanny} style={{ opacity, top: -60, maxWidth: '100%' }}/>
        <div style={styles.overlay}/>
        <div style={styles.children}>
          { children }
        </div>
      </div>
    );
  }
}

export default Background;
