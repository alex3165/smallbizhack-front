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

export const postOrder = (merchantId, products) => dispatch => {
  const params = {
    order: {
      customerId: '67',
      products
    }
  };

  return fetch(req(api(`merchants/${merchantId}/invoices`), 'POST', JSON.stringify(params)))
  .then(res => res.json())
};

export const onPayOrder = (orderId) => dispatch => {
  console.log('pay order')
};
