import React, { Component } from 'react';
import Navigation from '../components/navigation';
import { connect } from 'react-redux';
import { getMerchants } from '../actions/merchants';
import Spinner from '../components/spinner';
import ListCard from '../components/listCard';
import { colors } from '../colors';

const styles = {
  header: {
    width: '100%',
    height: 240,
    overflow: 'hidden'
  },
  image: {
    width: '100%'
  },
  container: {
    width: '90%',
    margin: 'auto'
  },
  side: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  description: {
    padding: '0px 20px',
    flex: 8
  },
  productName: {
    marginBottom: 4
  },
  price: {
    color: colors.grayText,
    marginTop: 6
  }
}

class Products extends Component {

  componentWillMount() {
    this.props.getMerchants()
  }

  render() {
    const m = this.props.merchants['123145730634399'];

    if (!m) {
      return <Spinner/>
    }

    return (
      <div>
        <Navigation>
          <h4>My shop</h4>
        </Navigation>
        <div>
          <div style={styles.header}>
            <img src={m.image} style={styles.image}/>
          </div>
          <div style={styles.container}>
            {
              m.products.map((product, key) => (
                <ListCard
                  key={key}
                  imageUrl={product.images[0]}
                >
                  <div style={styles.side}>
                    <div style={styles.description}>
                      <h3 style={styles.productName}>{ product.name }</h3>
                      <div>Description of product</div>
                      <div style={styles.price}>Price: {product.price}£</div>
                    </div>
                  </div>
                </ListCard>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  merchants: state.merchants
}), (dispatch) => ({
  getMerchants: () => dispatch(getMerchants())
}))(Products)