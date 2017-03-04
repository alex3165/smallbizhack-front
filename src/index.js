import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

import App from './containers/App';
import Login from './containers/Login';
import Merchants from './containers/Merchants';
import SingleMerchant from './containers/SingleMerchant';
import Orders from './containers/Orders';

import './index.css';

const middlewares = [ thunk ];
middlewares.push(createLogger());

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.routing
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="/merchants" component={Merchants}/>
        <Route path="/merchant/:id" component={SingleMerchant}/>
        {
          // Merchants
        }
        <Route path="/orders" component={Orders}/>
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('root')
);
