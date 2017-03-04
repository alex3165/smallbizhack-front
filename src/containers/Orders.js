import React, { Component } from 'react';
import Navigation from '../components/navigation';
import Search from '../components/search';
import { getOrders, onPayOrder } from '../actions/orders';
import { connect } from 'react-redux';
import ListCard from '../components/listCard';
import Spinner from '../components/spinner';
import Button from '../components/button';
import { colors } from '../colors';

const styles = {
  container: {
    width: '80%',
    margin: 'auto'
  },
  title: {
    marginBottom: 8
  },
  order: {
    marginLeft: 12
  },
  description: {
    color: colors.middleGray,
    fontSize: 13
  },
  price: {
    marginTop: 4,
    color: colors.darkBlue
  }
}

class Orders extends Component {

  state = {
    selectedCard: ''
  }

  componentWillMount() {
    this.props.getOrders();
  }

  onToggle = (key) => {
    if (key === this.state.selectedCard) {
      this.setState({
        selectedCard: undefined
      });
    } else {
      this.setState({
        selectedCard: key
      });
    }
  }

  onSettleUp = () => {
    this.props.onPayOrder();
  }

  onChange = () => {

  }

  render() {
    const { orders } = this.props;

    if (Object.keys(orders).length <= 0) {
      return <Spinner/>
    }

    return (
      <div>
        <Navigation>
          <h4>Customers orders</h4>
        </Navigation>
        <div style={styles.container}>
          <Search onChange={this.onChange} placeholder="Search by name"/>
          <div>
            {
              Object.keys(orders).map(k => (
                <div key={k}>
                  <ListCard onClick={() => this.onToggle(k)} imageUrl={orders[k].customer.image}>
                    <div style={styles.order}>
                      <h5 style={styles.title}>{ orders[k].customer.name }</h5>
                      <div style={styles.description}>
                        <div>Ordered: { orders[k].products.map(p => p.name).join(', ') }</div>
                        <div style={styles.price}>{ orders[k].total }£</div>
                      </div>
                    </div>
                  </ListCard>
                  {
                    this.state.selectedCard === k && (
                      <div>
                        <Button onClick={this.onSettleUp}>
                          Settle up
                        </Button>
                        <Button style={{ marginLeft: 10 }}>
                          Pay with square
                        </Button>
                      </div>
                    )
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ orders }) => ({
  orders
}), (dispatch) => ({
  getOrders: () => dispatch(getOrders()),
  onPayOrder: () => dispatch(onPayOrder())
}))(Orders)
