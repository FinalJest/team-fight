import { ActionType } from 'typesafe-actions';

import { nanoid } from 'nanoid';
import * as actions from './actions';
import * as types from './actionTypes';
import { TournamentsState } from '../../types/TournamentsState';
import { ITournament } from '../../types/ITournament';

const getEmptyTournament = (name: string, teamCount: number): ITournament => ({
    id: nanoid(),
    teamCount,
    name,
});

export const initialTournamentState = [];

export const tournaments = (
    state: TournamentsState = initialTournamentState,
    action: ActionType<typeof actions>,
): TournamentsState => {
    switch (action.type) {
        case types.ADD_TOURNAMENT:
            return [...state, getEmptyTournament(action.payload.name, action.payload.teamCount)];
        default:
            return state;
    }
};
