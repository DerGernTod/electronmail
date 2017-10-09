import ReactDOM from 'react-dom';
import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import createHashHistory from 'history/createHashHistory';
import Main from './components/Main.jsx';
import reducers from './store/reducers';
const history = createHashHistory();
const store = createStore(
  reducers,
  compose(window.devToolsExtension && window.devToolsExtension(), applyMiddleware(routerMiddleware(history), thunkMiddleware, logger))
);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={Main} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('content')
);
