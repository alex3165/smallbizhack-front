import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { getMerchants } from '../actions/merchants';
import Spinner from "react-svg-spinner";

const styles = {
  spinner: {
    height: '100vh',
    width: 64,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
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

        Merchant view from Id
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
