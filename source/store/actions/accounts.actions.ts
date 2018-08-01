import { ActionTypeAccount, AccountAction } from './ActionTypes';
import { Dispatch, Action } from 'redux'
import { findAllAccounts } from '@/service/accounts';
import { AsyncAction } from '@/store/actions';

function initLoadAccounts(): AccountAction {
  return {
    type: ActionTypeAccount.INIT_LOAD_ACCOUNTS
  };
}
function loadAccountsComplete(accounts: string[]): AccountAction {
  return {
    type: ActionTypeAccount.LOAD_ACCOUNTS_COMPLETE,
    payload: accounts
  };
}
export function loadAccounts(scrollToId: number): AsyncAction<void> {
  return async (dispatch) => {
    dispatch(initLoadAccounts());
    const accounts = await findAllAccounts();
    dispatch(loadAccountsComplete(
      accounts.map(account => account.name).sort((a, b) => a.localeCompare(b))
    ));
    let element = document.getElementById(`accounts-list-id-${scrollToId}`);
    element && element.scrollIntoView(false);
  };
}
