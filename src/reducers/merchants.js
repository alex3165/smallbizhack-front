import { ADD_MERCHANTS } from '../constants/merchants';

const defaultState = {};

const merchants = (state = defaultState, { type, payload }) => {
  switch(type) {
    case ADD_MERCHANTS: {
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

export default merchants;
