import ActionTypes from './ActionTypes';

import {findAllAccounts} from 'service/accounts';
function initLoadAccounts() {
  return {
    type: ActionTypes.INIT_LOAD_ACCOUNTS
  };
}
function loadAccountsComplete(accounts) {
  return {
    type: ActionTypes.LOAD_ACCOUNTS_COMPLETE,
    payload: accounts
  };
}
export function loadAccounts(scrollToId) {
  return dispatch => {
    dispatch(initLoadAccounts());
    findAllAccounts()
    .then(accounts => dispatch(
      loadAccountsComplete(
        accounts.sort((a, b) => a.name.localeCompare(b.name))
      )
    ))
    .then(() => {
      let element = document.getElementById(`accounts-list-id-${scrollToId}`);
      element && element.scrollIntoViewIfNeeded();
    });
  };
}
