import { RouterState } from "react-router-redux";
import { Mail } from "@/typings";

export interface State {
  routerState: RouterState;
  mails: MailState;
  accounts: AccountState
}

export interface AccountState {
  loading: boolean;
  data: any[];
}

export interface MailState {
  mails: Mail[];
}

export const defaultMailsState: MailState = {
  mails: []
};

export const defaultAccountsState: AccountState = {
  loading: false,
  data: []
};

export const defaultRouterState: RouterState = {
  location: {
    hash: '',
    pathname: '',
    search: '',
    state: void 0
  }
};

export const defaultState: State = {
  mails: defaultMailsState,
  accounts: defaultAccountsState,
  routerState: defaultRouterState
};
