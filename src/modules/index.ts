import { AnyAction, combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Dispatch } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as actions from './actions';
import * as reducers from './reducers';

export const rootReducer = combineReducers(reducers);

export type ReduxState = ReturnType<typeof rootReducer>;
export type ReduxActions = ActionType<typeof actions>;
export type DispatchActions = Dispatch<ReduxActions> & ThunkDispatch<ReduxState, null, AnyAction>;

export type ThunkActionResult<T> = ThunkAction<T, ReduxState, null, AnyAction>;
