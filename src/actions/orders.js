import { ADD_ORDERS } from '../constants';
import { req, api } from '../fetch';

const addOrders = data => ({
  type: ADD_ORDERS,
  payload: data
});

export const getOrders = (merchantId = '123145730634399') => dispatch => (
  fetch(req(api(`merchants/${merchantId}/invoices`)))
    .then(res => res.json())
    .then((data) => dispatch(addOrders(data)))
);

export const onPayOrder = (orderId) => dispatch => {
  console.log('Pay order');
};
