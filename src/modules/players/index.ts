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
        case types.EDIT_PLAYER:
            return state.map((player) => (player.id === action.payload.id ? { ...player, ...action.payload } : player));
        case types.REMOVE_PLAYER:
            return state.filter((player) => player.id !== action.payload);
        default:
            return state;
    }
};
