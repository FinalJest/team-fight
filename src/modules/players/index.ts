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
        case types.EDIT_PLAYERS:
            return state.map((player) =>
                (action.payload[player.id] ? { ...player, ...action.payload[player.id] } : player));
        case types.REMOVE_PLAYER:
            return state.filter((player) => player.id !== action.payload);
        case types.REMOVE_PLAYERS:
            return state.filter((player) => !action.payload.includes(player.id));
        case types.MAKE_PLAYERS_TEAMLESS:
            return state.map((player) => (action.payload.includes(player.id)
                ? { ...player, teamId: undefined }
                : player));
        case types.MAKE_PLAYERS_RETIRED:
            return state.map((player) => (action.payload.includes(player.id)
                ? { ...player, isRetired: true, teamId: undefined }
                : player));
        case types.ADD_FAME:
            return state.map((player) => ({
                ...player,
                fame: action.payload.data[player.id]
                    ? player.fame + Math.floor(
                        action.payload.data[player.id] * (action.payload.mvpId === player.id ? 1.5 : 1),
                    )
                    : player.fame,
            }));
        default:
            return state;
    }
};
