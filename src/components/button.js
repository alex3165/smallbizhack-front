import React from 'react';

const buttonStyle = {
  backgroundColor: '#2980b9',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  borderRadius: 5,
  fontSize: 13,
  outline: 'none'
};

const button = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ ...buttonStyle, ...(style || {})}}>
    { children }
  </button>
);

export default button;
