import { AnyAction, Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from '../modules';

export type ReduxStore = Store<ReduxState> & { dispatch: ThunkDispatch<ReduxState, null, AnyAction> };
