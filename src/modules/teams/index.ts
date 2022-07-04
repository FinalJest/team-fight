import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import * as types from './actionTypes';
import { TeamsState } from '../../types/TeamsState';
import { IRosterIds } from '../../types/IRoster';
import { getFameFromPlacement } from '../../services/placementService';
import { createRosterWithPlayer } from '../../services/teamService';

export const initialTeamsState = [];

export const teams = (
    state: TeamsState = initialTeamsState,
    action: ActionType<typeof actions>,
): TeamsState => {
    switch (action.type) {
        case types.ADD_TEAM:
            return [...state, action.payload];
        case types.EDIT_TEAM:
            return state.map((team) => (team.id === action.payload.id
                ? { ...team, ...action.payload }
                : team));
        case types.ASSIGN_PLAYER_TO_ROSTER:
            return state.map((team) => {
                const { player, teamId: changedTeamId } = action.payload;
                if (team.id !== changedTeamId) {
                    return team;
                }

                const { roster } = team;
                const newRoster = createRosterWithPlayer(player, roster);
                return {
                    ...team,
                    roster: {
                        ...roster,
                        ...newRoster,
                    },
                };
            });
        case types.UPDATE_TEAM_ROSTER:
            return state.map((team) => {
                let newRoster: IRosterIds | undefined;
                if (Array.isArray(action.payload)) {
                    newRoster = action.payload.find((changingData) => changingData.id === team.id)?.roster;
                } else if (team.id === action.payload.id) {
                    newRoster = action.payload.roster;
                }
                return newRoster
                    ? { ...team, roster: { ...team.roster, ...newRoster } }
                    : team;
            });
        case types.PROMOTE_PLAYER:
            return state.map((team) => {
                if (team.id !== action.payload.teamId) {
                    return team;
                }
                const currentPlayerOnPosition = team.roster[action.payload.position];
                let newOther = team.roster.other?.filter((id) => id !== action.payload.playerId);
                if (currentPlayerOnPosition) {
                    if (!newOther) {
                        newOther = [];
                    }
                    newOther.push(currentPlayerOnPosition);
                }
                return {
                    ...team,
                    roster: {
                        ...team.roster,
                        [action.payload.position]: action.payload.playerId,
                        other: newOther,
                    },
                };
            });
        case types.REMOVE_TEAM:
            return state.filter((team) => team.id !== action.payload);
        case types.TOGGLE_TEAM_DISABLED:
            return state.map((team) =>
                (team.id === action.payload ? { ...team, roster: {}, isDisabled: !team.isDisabled } : team));
        case types.RECORD_TOURNAMENT_RESULT:
            return state.map((team) => {
                const place = action.payload.data[team.id];

                if (place === undefined) {
                    return team;
                }

                return {
                    ...team,
                    fame: team.fame + (action.payload.isForFame ? getFameFromPlacement(place) : 0),
                    history: [...team.history, {
                        tournamentId: action.payload.tournamentId,
                        place,
                        roster: { ...team.roster },
                    }],
                };
            });
        default:
            return state;
    }
};
