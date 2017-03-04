import React from 'react';
import { colors } from '../colors';

const container = {
  width: '100%',
  backgroundColor: 'white',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${colors.navBorder}`
}

const navigation = ({ children, style }) => (
  <div style={{ ...container, ...(style || {}) }}>
    { children }
  </div>
);

export default navigation;
