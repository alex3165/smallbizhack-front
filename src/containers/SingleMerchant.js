import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { getMerchants } from '../actions/merchants';
import { colors } from '../colors';
import Navigation from '../components/navigation';
import ListCard from '../components/listCard';
import Spinner from '../components/spinner';
import basket from '../basket.svg';
import { postOrder } from '../actions/orders';

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
    padding: '0px 10%',
    backgroundColor: '#f9f9f9',
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
  description: {
    padding: '0px 20px',
    flex: 8
  },
  side: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  productName: {
    marginBottom: 8
  },
  price: {
    color: colors.grayText
  },
  order: {
    position: 'fixed',
    backgroundColor: colors.green,
    display: 'flex',
    justifyContent: 'center',
    borderTop: `1px solid ${colors.navBorder}`,
    color: 'white',
    alignItems: 'center',
    height: 52,
    bottom: 0,
    left: 0,
    right: 0
  },
  add: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4
  },
  basket: {
    width: 20
  },
  selected: {
    border: `1px solid ${colors.green}`
  }
}

class SingleMerchant extends Component {

  state = {
    selected: []
  }

  componentWillMount() {
    const { shouldFetch, getMerchants } = this.props;
    console.log(shouldFetch);

    if (shouldFetch) {
      getMerchants();
    } else {
      document.body.scrollTop = 0;
    }
  }

  onClick = (key) => {
    const { selected } = this.state;

    if (selected.includes(key)) {
      this.setState({
        selected: selected.filter(s => s != key)
      });
    } else {
      this.setState({
        selected: selected.concat([key])
      });
    }
  }

  onAddOrder = () => {
    const { onAddOrder, merchant } = this.props;
    const { selected } = this.state;

    onAddOrder(merchant.id, selected.reduce((acc, pId) => {
      const alreadyExist = acc.find(p => p.productId === pId);
      if (alreadyExist) {
        return acc.map(({ productId, quantity }) => {
          if (productId === pId) {
            return {
              productId,
              quantity: quantity + 1
            }
          }
        });
      }

      acc.push({
        productId: pId,
        quantity: 1
      });

      return acc;
    }, []))
  }

  render() {
    const { merchant } = this.props;
    const { selected } = this.state;

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
            <h4>{merchant.name}</h4>
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
                <ListCard
                  style={selected.includes(key) ? styles.selected : {}}
                  imageUrl={product.images[0]}
                  key={key}
                  onClick={() => this.onClick(key)}
                >
                  <div style={styles.side}>
                    <div style={styles.description}>
                      <h3 style={styles.productName}>{ product.name }</h3>
                      <div style={styles.price}>Price: {product.price}£</div>
                    </div>
                    <div style={styles.add}>
                      <img src={basket} style={styles.basket}/>
                    </div>
                  </div>
                </ListCard>
              ))
            }
          </div>
        </div>
        {
          selected.length > 0 && (
            <div style={styles.order} onClick={this.onAddOrder}>
              <h5>Order</h5>
            </div>   
          )
        }
      </div>
    );
  }
}

export default connect((state, { params }) => ({
  merchant: state.merchants[params.id],
  shouldFetch: Object.keys(state.merchants).length <= 0
}), (dispatch) => ({
  getMerchants: () => dispatch(getMerchants()),
  onAddOrder: (mId, products) => dispatch(postOrder(mId, products))
}))(SingleMerchant);
