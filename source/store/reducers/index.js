import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mails from './mails.reducers';
import accounts from './accounts.reducers';
export default combineReducers({
  routerReducer,
  mails,
  accounts
});
