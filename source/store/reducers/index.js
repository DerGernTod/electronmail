import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mails from './mails.reducers';
export default combineReducers({
  routerReducer,
  mails
});
