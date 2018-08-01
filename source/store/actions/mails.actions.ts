import Constants from '../../constants';
import { PayloadAction, ActionTypeMails } from './ActionTypes';
import { Mail } from '@/typings';
export function loadMails(/*accounts, folder*/): PayloadAction<ActionTypeMails.LOAD_MAILS, Mail[]> {
  return {
    type: ActionTypeMails.LOAD_MAILS,
    payload: Constants.MAILS
  };
}
