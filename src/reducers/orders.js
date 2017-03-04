import { ADD_ORDERS } from '../constants';

const defaultState = {};

const orders = (state = defaultState, { type, payload }) => {
  switch(type) {
    case ADD_ORDERS: {
      return payload.reduce((acc, next) => {
        acc[next.id] = next;
        return acc;
      }, {})
    }

    default: {
      return state;
    }
  }
};

export default orders;
