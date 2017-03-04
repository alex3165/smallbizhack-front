import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { getMerchants } from '../actions/merchants';
import { colors } from '../colors';
import Navigation from '../components/navigation';
import ListCard from '../components/listCard';
import Spinner from '../components/spinner';

const styles = {
  wrapper: {},
  back: {
    flex: 2,
    height: '100%',
    marginLeft: 20,
    display: 'flex',
    alignItems: 'center'
  },
  navigation: {
    position: 'fixed',
    zIndex: 10,
    top: 0
  },
  map: {
    height: 240,
    width: "100vw",
    position: 'fixed',
    top: 0,
    zIndex: -1
  },
  navigationTitle: {
    flex: 10,
    marginLeft: '50px'
  },
  container: {
    width: '80%',
    margin: 'auto',
    marginTop: 240
  },
  products: {

  },
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
    width: 100,
    height: '100%',
    overflow: 'hidden'
  },
  description: {
    padding: '0px 20px'
  },
  productName: {
    marginBottom: 8
  },
  price: {
    color: colors.grayText
  },
  order: {
    position: 'fixed',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    borderTop: `1px solid ${colors.navBorder}`,
    alignItems: 'center',
    height: 52,
    bottom: 0,
    left: 0,
    right: 0
  }
}

class SingleMerchant extends Component {
  componentWillMount() {
    const { shouldFetch, getMerchants } = this.props;
    console.log(shouldFetch);

    if (shouldFetch) {
      getMerchants();
    }
  }

  render() {
    const { merchant } = this.props;

    if (!merchant) {
      return (
        <Spinner/>
      )
    }

    return (
      <div style={styles.wrapper}>
        <Navigation style={styles.navigation}>
          <div onClick={() => browserHistory.push('/merchants')} style={styles.back}>Back</div>
          <div style={styles.navigationTitle}>
            {merchant.name}
          </div>
        </Navigation>
        <ReactMapboxGl
          style="mapbox://styles/alex3165/cizvg1wrd002j2rled2afkofo"
          accessToken="pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiY2l4b3V0Z3RpMDAxczJ4cWk2YnEzNTVzYSJ9.MFPmOyHy8DM5_CVaqPYhOg"
          center={merchant.latlng}
          containerStyle={styles.map}>
            <Layer
              type="symbol"
              id="marker"
              layout={{
                "icon-image": "circle-15"
              }}>
              <Feature coordinates={merchant.latlng}/>
            </Layer>
        </ReactMapboxGl>
        <div style={styles.container}>
          <h2 style={{ paddingTop: 20 }}>Products</h2>
          <div style={styles.products}>
            {
              merchant.products.map((product, key) => (
                <ListCard imageUrl={product.images[0]} key={key}>
                  <div style={styles.description}>
                    <h3 style={styles.productName}>{ product.name }</h3>
                    <div style={styles.price}>Price: {product.price}£</div>
                  </div>
                </ListCard>
              ))
            }
          </div>
        </div>
        <div style={styles.order}>
          <h5>Order</h5>
        </div>
      </div>
    );
  }
}

export default connect((state, { params }) => ({
  merchant: state.merchants[params.id],
  shouldFetch: Object.keys(state.merchants).length <= 0
}), (dispatch) => ({
  getMerchants: () => dispatch(getMerchants())
}))(SingleMerchant);
