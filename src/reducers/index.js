import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  routing,
  entities: (state = {}, action) => state
});

export default reducers;
