import React from 'react';
import { colors } from '../colors';
import check from '../check.svg';

const validationStyle = {
  position: 'absolute',
  zIndex: 99,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  backgroundColor: colors.green
};

const title = {
  color: 'white'
}

const image = {
  width: 80
}

const validation = () => (
  <div style={validationStyle}>
    <img src={check} style={image}/>
    <h2 style={title}>Booking successful</h2>
  </div>
);

export default validation;
