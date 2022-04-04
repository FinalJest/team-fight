import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import * as types from './actionTypes';
import { PlayersState } from '../../types/PlayersState';

export const initialPlayersState = [];

export const players = (
    state: PlayersState = initialPlayersState,
    action: ActionType<typeof actions>,
): PlayersState => {
    switch (action.type) {
        case types.ADD_PREMADE_PLAYERS:
            return [...state, ...action.payload];
        default:
            return state;
    }
};