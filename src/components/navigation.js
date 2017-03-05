import React from 'react';
import { colors } from '../colors';

const container = {
  position: 'fixed',
  top: '0',
  width: '100%',
  backgroundColor: `${colors.navColor}`,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}

const navigation = ({ children, style }) => (
  <div style={{ ...container, ...(style || {}) }}>
    { children }
  </div>
);

export default navigation;
