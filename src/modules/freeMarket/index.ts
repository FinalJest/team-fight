import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import * as types from './actionTypes';
import { FreeMarketState } from '../../types/FreeMarketState';

export const initialFreeMarketState: FreeMarketState = {
    teamsThatDidTransfer: [],
    playersWithTeamsActivelyInterested: {},
};

export const freeMarket = (
    state: FreeMarketState = initialFreeMarketState,
    action: ActionType<typeof actions>,
): FreeMarketState => {
    switch (action.type) {
        case types.MAKE_TEAM_INTERESTED_IN_PLAYER: {
            const currentTeams = state.playersWithTeamsActivelyInterested[action.payload.playerId];
            return {
                ...state,
                playersWithTeamsActivelyInterested: {
                    ...state.playersWithTeamsActivelyInterested,
                    [action.payload.playerId]: [...(currentTeams ?? []), action.payload.teamId],
                },
            };
        }
        case types.MAKE_TEAM_UNINTERESTED_IN_PLAYER: {
            const currentTeams = state.playersWithTeamsActivelyInterested[action.payload.playerId];
            if (!currentTeams) {
                return state;
            }
            return {
                ...state,
                playersWithTeamsActivelyInterested: {
                    ...state.playersWithTeamsActivelyInterested,
                    [action.payload.playerId]: currentTeams.filter((teamId) => teamId !== action.payload.teamId),
                },
            };
        }
        case types.REMOVE_PLAYER_FROM_INTERESTED: {
            const newPlayersWithInterest = { ...state.playersWithTeamsActivelyInterested };
            delete newPlayersWithInterest[action.payload];
            return {
                ...state,
                playersWithTeamsActivelyInterested: newPlayersWithInterest,
            };
        }
        case types.ADD_TEAM_TO_TRANSFERRED:
            return {
                ...state,
                teamsThatDidTransfer: [...state.teamsThatDidTransfer, action.payload],
            };
        case types.RESET_WHOLE_MARKET:
            return initialFreeMarketState;
        default:
            return state;
    }
};
