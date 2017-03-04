import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMerchants } from '../actions/merchants';
import Spinner from "react-svg-spinner";

const styles = {
  container: {
    padding: '40px 0px'
  },
  card: {
    width: '80%',
    margin: 'auto'
  },
  image: {
    width: '100%',
    height: 200
  },
  description: {
    width: '100%',
    height: 120,
    backgroundColor: 'white'
  },
  spinner: {
    height: '100vh',
    width: 64,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
}

class Merchants extends Component {

  componentWillMount() {
    this.props.getMerchants();
  }

  render() {
    const { merchants } = this.props;

    if (Object.keys(merchants).length <= 0) {
      return (
        <div style={styles.spinner}>
          <Spinner color="#1abc9c" size="200px"/>
        </div>
      )
    }

    return (
      <div style={styles.container}>
        {
          Object.keys(merchants).map(k => (
            <div key={k} style={styles.card}>
              <div style={styles.image}/>
              <div style={styles.description}>
                { merchants[k].name }
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default connect((state) => ({
  merchants: state.merchants
}), (dispatch) => ({
  getMerchants: () => dispatch(getMerchants())
}))(Merchants);
