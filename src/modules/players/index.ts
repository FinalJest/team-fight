import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import * as types from './actionTypes';
import { PlayersState } from '../../types/PlayersState';
import { getRandomInt } from '../../services/randomGenerator';

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
        case types.REMOVE_PLAYERS:
            return state.filter((player) => !action.payload.includes(player.id));
        case types.MAKE_PLAYERS_TEAMLESS:
            return state.map((player) => (action.payload.includes(player.id)
                ? { ...player, teamId: undefined }
                : player));
        case types.PROGRESS_PLAYERS:
            return state.map((player) => {
                let skillChange = 0;
                let potentialChange = 0;
                if (getRandomInt(10, 1) <= player.potential) {
                    skillChange = getRandomInt(21, 1);
                    potentialChange = -1;
                } else if (getRandomInt(10, 1) > player.potential) {
                    skillChange = -1 * getRandomInt(21, 1);
                }
                return {
                    ...player,
                    skill: player.skill + skillChange,
                    potential: Math.max(player.potential + potentialChange, 0),
                };
            });
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
