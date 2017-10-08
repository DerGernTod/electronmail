import ReactDOM from 'react-dom';
import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHashHistory from 'history/createHashHistory';
import Main from './components/Main.jsx';
const history = createHashHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  /*combineReducers({
    // ...reducers,
    view: store => store,
    router: routerReducer
  }),*/
  routerReducer,
  compose(window.devToolsExtension && window.devToolsExtension(), applyMiddleware(middleware))
);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={Main} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('content')
);
