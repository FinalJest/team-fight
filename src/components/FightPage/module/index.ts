import { ActionType } from 'typesafe-actions';
import { ComponentState } from '../types/ComponentState';

import * as actions from './actions';
import * as types from './actionTypes';
import { NO_TEAM_VALUE } from '../../TeamSelect';

export const initialState: ComponentState = {
    teams: [],
    results: [],
};

export const reducer = (
    state: ComponentState = initialState,
    action: ActionType<typeof actions>,
): ComponentState => {
    switch (action.type) {
        case types.SET_TEAM: {
            const newTeams = [...state.teams];
            newTeams[action.payload.index] = action.payload.id === NO_TEAM_VALUE ? undefined : action.payload.id;
            return {
                teams: newTeams,
                results: [],
            };
        }
        case types.ADD_RESULTS:
            return {
                ...state,
                results: action.payload,
            };
        default:
            return state;
    }
};
