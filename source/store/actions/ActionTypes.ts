import { Action } from 'redux';
import { Mail } from '@/typings';

export type ActionType = ActionTypeMails & ActionTypeAccount;

export const enum ActionTypeMails {
  LOAD_MAILS = 'LOAD_MAILS'
}

export const enum ActionTypeAccount {
  INIT_LOAD_ACCOUNTS = 'INIT_LOAD_ACCOUNTS',
  LOAD_ACCOUNTS_COMPLETE = 'LOAD_ACCOUNTS_COMPLETE'
}

export interface MailAction extends Action {
  type: ActionTypeMails;
  payload?: Mail[];
}

export interface AccountAction extends Action {
  type: ActionTypeAccount;
  payload?: string[];
  loading?: boolean;
}

export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}
