import React from 'react';
import { colors } from '../colors';
import user from '../user.svg';

const styles = {
  product: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    display: 'flex',
    margin: '20px 0px',
    border: `1px solid ${colors.grayBorder}`,
    borderRadius: 5,
    boxSizing: 'border-box'
  },
  image: {
    width: 140,
    height: '100%',
    overflow: 'hidden',
    backgroundColor: colors.lightGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}

const listCard = ({ children, imageUrl, onClick, style }) => (
  <div style={{ ...styles.product, ...style }} onClick={onClick}>
    <div style={styles.image}>
      <img src={imageUrl || user} style={{ maxHeight: '100%', width: !imageUrl && 50 }}/>
    </div>
    <div style={{ width: '100%'}}>
      { children }
    </div>
  </div>
);

export default listCard;
