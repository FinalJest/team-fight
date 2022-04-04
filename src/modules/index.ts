import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Dispatch } from 'react';
import * as actions from './actions';
import * as reducers from './reducers';

export const rootReducer = combineReducers(reducers);

export type ReduxState = ReturnType<typeof rootReducer>;
export type ReduxActions = ActionType<typeof actions>;
export type DispatchActions = Dispatch<ReduxActions>;
