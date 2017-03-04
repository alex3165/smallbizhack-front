import React from 'react';
import { colors } from '../colors';

const style= {
  width: '100%',
  height: 42,
  margin: '12px auto',
  boxSizing: 'border-box',
  padding: '6px 12px',
  display: 'block',
  border: `1px solid ${colors.grayBorder}`,
  outline: 'none',
  fontSize: 13,
  color: colors.grayText
};

const search = ({ onChange, placeholder }) => (
  <input type="text" onChange={onChange} style={style} placeholder={placeholder}/>
);

export default search;
