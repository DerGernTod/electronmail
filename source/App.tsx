import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import createHashHistory from 'history/createHashHistory';
import Main from '@/components/Main';
import reducers from '@/store/reducers';
import { State } from '@/store/state';
const history = createHashHistory();
const store = createStore<State, AnyAction, any, {}>(
  reducers,
  (window as any).devToolsExtension && (window as any).devToolsExtension(),
  applyMiddleware(routerMiddleware(history), thunkMiddleware, logger)
);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={Main} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('content')
);
