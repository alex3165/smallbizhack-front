import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMerchants } from '../actions/merchants';
import Spinner from "react-svg-spinner";
import { browserHistory } from 'react-router'
import { colors } from '../colors';
import Navigation from '../components/navigation';
import Background from '../components/background';
import logo from '../logo.svg';
import Search from '../components/search';

const styles = {
  container: {
  },
  body: {
    width: '80%',
    margin: 'auto',
    marginTop: 240
  },
  navigation: {
    marginBottom: 40
  },
  card: {
    width: '100%',
    margin: 'auto',
    marginBottom: '20px'
  },
  image: {
    width: '100%',
    height: 200,
    overflow: 'hidden'
  },
  description: {
    boxSizing: 'borderBox',
    width: '100%',
    backgroundColor: 'white',
    borderLeft: `1px solid ${colors.grayBorder}`,
    borderRight: `1px solid ${colors.grayBorder}`,
    borderBottom: `1px solid ${colors.grayBorder}`,
  },
  wdescription: {
    width: '80%',
    margin: 'auto'
  },
  spinner: {
    height: '100vh',
    width: 64,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    textAlign: 'left',
    paddingTop: 20,
    fontWeight: '300',
    fontSize: '20px'
  },
  logo: {
    width: 140,
    bottom: 20,
    left: 0,
    right: 0,
    margin: '40px auto',
    display: 'block'
  },
  mname: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 12,
    paddingBottom: 6
  },
  distance: {
    paddingBottom: 12,
    color: colors.middleGray
  }
}

class Merchants extends Component {

  state = {
    query: ''
  };

  componentWillMount() {
    this.props.getMerchants([48.1130626, -1.6686659]);
  }

  onChange = ({ target }) => {
    this.setState({
      query: target.value
    });
  };

  render() {
    const { merchants } = this.props;
    const { query } = this.state;

    const filteredMerchants = Object.keys(merchants).filter(k => (
      !!merchants[k].categories.find(cat => cat.toLowerCase().includes(query.toLowerCase()))
    ));

    if (Object.keys(merchants).length <= 0) {
      return (
        <div style={styles.spinner}>
          <Spinner color="#1abc9c" size="200px"/>
        </div>
      )
    }

    return (
      <div style={styles.container}>
        <Background>
          <Search placeholder="Search for a category" onChange={this.onChange}/>
        </Background>
        <div style={styles.body}>
          <h4 style={styles.title}>
            Producers from Britanny
          </h4>
          {
            filteredMerchants.map(k => (
              <div key={k} style={styles.card} onClick={() => browserHistory.push(`/merchant/${k}`)}>
                <div style={styles.image}>
                  <img style={{ maxWidth: '100%' }} src={merchants[k].image}/>
                </div>
                <div style={styles.description}>
                  <div style={styles.wdescription}>
                    <h4 style={styles.mname}>{ merchants[k].name }</h4>
                    {
                      merchants[k].distance && (
                        <div style={styles.distance}>Distance: {merchants[k].distance.toFixed(2)} km</div>
                      )
                    }
                  </div>
                </div>
              </div>
            ))
          }
          <img src={logo} style={styles.logo}/>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  merchants: state.merchants
}), (dispatch) => ({
  getMerchants: (latlng) => dispatch(getMerchants(latlng))
}))(Merchants);
