import { MailAction, ActionTypeMails } from '../actions/ActionTypes';
import { State, defaultState, MailState, defaultMailsState } from '@/store/state';
export default (state: MailState = defaultMailsState, action: MailAction) => {
  switch (action.type) {
  case ActionTypeMails.LOAD_MAILS:
    state = {
      ...state,
      mails: action.payload && action.payload.slice() || []
    }
    break;
  }
  return state;
};
