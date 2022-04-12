import { AnyAction, combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Dispatch } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as actions from './actions';
import * as types from './actionTypes';
import * as reducers from './reducers';

export type ReduxActions = ActionType<typeof actions>;

export const rootReducer = (state: any, action: ReduxActions) => {
    const appReducer = combineReducers(reducers);
    if (action.type === types.RESET_STATE) {
        // @ts-expect-error Redux/TS/typesafe-actions don't mesh well, can't declare it without recursion
        return appReducer(action.payload, action);
    }
    return appReducer(state, action);
};

export type ReduxState = ReturnType<typeof rootReducer>;
export type DispatchActions = Dispatch<ReduxActions> & ThunkDispatch<ReduxState, null, AnyAction>;

export type ThunkActionResult<T> = ThunkAction<T, ReduxState, null, AnyAction>;
