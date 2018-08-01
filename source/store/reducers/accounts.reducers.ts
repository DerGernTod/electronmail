import { AccountAction, ActionTypeAccount } from '../actions/ActionTypes';
import { AccountState, defaultAccountsState } from '@/store/state';
export default (state: AccountState = defaultAccountsState, action: AccountAction) => {
  switch (action.type) {
  case ActionTypeAccount.INIT_LOAD_ACCOUNTS:
    state = {
      ...state,
      loading: true
    };
    break;
  case ActionTypeAccount.LOAD_ACCOUNTS_COMPLETE:
    state = {
      ...state,
      data: action.payload && action.payload.slice() || [],
      loading: false
    };
    break;
  }
  return state;
};
