import { AnyAction, combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Dispatch } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as actions from './actions';
import * as types from './actionTypes';
import * as reducers from './reducers';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { initialAppState } from './app';
import { initialPlayersState } from './players';
import { initialTeamsState } from './teams';
import { initialTournamentState } from './tournaments';
import { initialFreeMarketState } from './freeMarket';

// Redux/TS/typesafe-actions don't mesh well, can't declare it without recursion
const setLocalStorageState = (state: unknown): void => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const initialBasicState = {
    app: initialAppState,
    freeMarket: initialFreeMarketState,
    players: initialPlayersState,
    teams: initialTeamsState,
    tournaments: initialTournamentState,
};

export type ReduxActions = ActionType<typeof actions>;

// Redux/TS/typesafe-actions don't mesh well, can't declare it without recursion
export const rootReducer = (state: any, action: ReduxActions) => {
    const appReducer = combineReducers(reducers);
    let newState;
    if (action.type === types.RESET_STATE) {
        newState = appReducer({ ...(action.payload ?? initialBasicState), app: state.app }, action);
    } else {
        newState = appReducer(state, action);
    }
    setLocalStorageState(newState);
    return newState;
};

export type ReduxState = ReturnType<typeof rootReducer>;
export type DispatchActions = Dispatch<ReduxActions> & ThunkDispatch<ReduxState, null, AnyAction>;

export type ThunkActionResult<T> = ThunkAction<T, ReduxState, null, AnyAction>;
