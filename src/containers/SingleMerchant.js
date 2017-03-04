import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { getMerchants } from '../actions/merchants';
import Spinner from "react-svg-spinner";
import { colors } from '../colors';

const styles = {
  navigation: {
    width: '100%',
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${colors.navBorder}`
  },
  back: {
    flex: 2,
    height: '100%',
    marginLeft: 20,
    display: 'flex',
    alignItems: 'center'
  },
  navigationTitle: {
    flex: 10,
    marginLeft: '50px'
  },
  spinner: {
    height: '100vh',
    width: 64,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    width: '80%',
    margin: 'auto'
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
        <div style={styles.spinner}>
          <Spinner color="#1abc9c" size="200px"/>
        </div>
      )
    }

    return (
      <div>
        <div style={styles.navigation}>
          <div onClick={() => browserHistory.push('/merchants')} style={styles.back}>Back</div>
          <div style={styles.navigationTitle}>
            {merchant.name}
          </div>
        </div>
        <ReactMapboxGl
          style="mapbox://styles/alex3165/cizvg1wrd002j2rled2afkofo"
          accessToken="pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiY2l4b3V0Z3RpMDAxczJ4cWk2YnEzNTVzYSJ9.MFPmOyHy8DM5_CVaqPYhOg"
          center={merchant.latlng}
          containerStyle={{
            height: "300px",
            width: "100vw"
          }}>
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
          <h2>Products</h2>
          {
            merchant.products.map(product => (
              <div style={styles.product} key={product.id}>
                <div style={styles.image}>
                  <img src={product.images[0]} style={{ maxHeight: '100%' }}/>
                </div>
                <div style={styles.description}>
                  <h3 style={styles.productName}>{ product.name }</h3>
                  <div style={styles.price}>Price: {product.price}£</div>
                </div>
              </div>
            ))
          }
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
