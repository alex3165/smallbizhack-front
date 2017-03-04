import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMerchants } from '../actions/merchants';
import Spinner from "react-svg-spinner";
import { browserHistory } from 'react-router'
import { colors } from '../colors';

const styles = {
  container: {
  },
  body: {
    width: '80%',
    margin: 'auto'
  },
  navigation: {
    width: '100%',
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderBottom: `1px solid ${colors.navBorder}`
  },
  card: {
    width: '100%',
    margin: 'auto'
  },
  image: {
    width: '100%',
    height: 200,
    overflow: 'hidden'
  },
  description: {
    boxSizing: 'borderBox',
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    borderLeft: `1px solid ${colors.grayBorder}`,
    borderRight: `1px solid ${colors.grayBorder}`,
    borderBottom: `1px solid ${colors.grayBorder}`,
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
        <div style={styles.navigation}/>
        <div style={styles.body}>
          <h1>Local producers</h1>
          {
            Object.keys(merchants).map(k => (
              <div key={k} style={styles.card} onClick={() => browserHistory.push(`/merchant/${k}`)}>
                <div style={styles.image}>
                  <img style={{ maxWidth: '100%' }} src={merchants[k].image}/>
                </div>
                <div style={styles.description}>
                  { merchants[k].name }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  merchants: state.merchants
}), (dispatch) => ({
  getMerchants: () => dispatch(getMerchants())
}))(Merchants);
