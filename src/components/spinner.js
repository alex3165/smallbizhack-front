import React from 'react';
import Spinner from "react-svg-spinner";

const spinnerStyle = {
  position: 'absolute',
  zIndex: 99,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: '100vh',
  width: 64,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center'
};

const spinner = () => (
  <div style={spinnerStyle}>
    <Spinner color="#1abc9c" size="200px"/>
  </div>
);

export default spinner;
