import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import * as types from './actionTypes';
import { TeamsState } from '../../types/TeamsState';

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
        case types.UPDATE_TEAM_ROSTER:
            return state.map((team) => (team.id === action.payload.id
                ? { ...team, roster: { ...team.roster, ...action.payload.roster } }
                : team));
        case types.REMOVE_TEAM:
            return state.filter((team) => team.id !== action.payload);
        default:
            return state;
    }
};
