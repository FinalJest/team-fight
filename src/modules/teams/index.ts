import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import * as types from './actionTypes';
import { TeamsState } from '../../types/TeamsState';

export const initialTeamsState: TeamsState = {
    list: [],
};

export const teams = (
    state: TeamsState = initialTeamsState,
    action: ActionType<typeof actions>,
): TeamsState => {
    switch (action.type) {
        case types.ADD_TEAM:
            return {
                ...state,
                list: [...state.list,
                    {
                        id: state.list.length,
                        name: action.payload.name,
                        logoUrl: action.payload.logoUrl,
                    },
                ],
            };
        default:
            return state;
    }
};
