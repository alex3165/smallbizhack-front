import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import merchants from './merchants';
import orders from './orders';

const reducers = combineReducers({
  routing,
  merchants,
  orders
});

export default reducers;
