import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { State } from '@/store/state';

export * from './mails.actions';
export * from './accounts.actions';

export type AsyncAction<T> = ThunkAction<Promise<T>, State, void, AnyAction>;

export type AsyncDispatch = ThunkDispatch<State, void, AnyAction>;
