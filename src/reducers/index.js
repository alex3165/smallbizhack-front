import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import merchants from './merchants';

const reducers = combineReducers({
  routing,
  merchants
});

export default reducers;
