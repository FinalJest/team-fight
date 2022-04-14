import { ActionType } from 'typesafe-actions';

import { nanoid } from 'nanoid';
import * as actions from './actions';
import * as types from './actionTypes';
import { TournamentsState } from '../../types/TournamentsState';
import { ITournament } from '../../types/ITournament';
import { generateGroups } from '../../services/groupGenerator';
import { TournamentFightType } from '../../types/TournamentFightType';

const getEmptyTournament = (
    name: string,
    teamCount: number,
    groupsCount: number,
): ITournament => ({
    id: nanoid(),
    teamCount,
    name,
    group: groupsCount
        ? {
            results: {},
            composition: generateGroups(teamCount, groupsCount),
        }
        : undefined,
});

export const initialTournamentState = [];

export const tournaments = (
    state: TournamentsState = initialTournamentState,
    action: ActionType<typeof actions>,
): TournamentsState => {
    switch (action.type) {
        case types.ADD_TOURNAMENT:
            return [...state, getEmptyTournament(
                action.payload.name,
                action.payload.teamCount,
                action.payload.groupsCount,
            )];
        case types.ADD_TEAM_TO_TOURNAMENT_GROUP:
            return state.map((tournament) => {
                if (tournament.id !== action.payload.tournamentId || !tournament.group) {
                    return tournament;
                }
                const newComposition = { ...tournament.group.composition };
                const newGroup = [...newComposition[action.payload.groupName]];
                newGroup[action.payload.indexInGroup] = action.payload.teamId;
                newComposition[action.payload.groupName] = newGroup;
                return { ...tournament, group: { ...tournament.group, composition: newComposition } };
            });
        case types.ADD_RESULT:
            return state.map((tournament) => {
                if (tournament.id !== action.payload.tournamentId) {
                    return tournament;
                }

                if (action.payload.type === TournamentFightType.Group && tournament.group) {
                    const newGroup = { ...tournament.group };
                    const team1results = newGroup.results[action.payload.team1] ?? {};
                    team1results[action.payload.team2] = action.payload.score;
                    const team2results = newGroup.results[action.payload.team2] ?? {};
                    team2results[action.payload.team1] = action.payload.score
                        && [action.payload.score[1], action.payload.score[0]];
                    newGroup.results = {
                        ...newGroup.results,
                        [action.payload.team1]: team1results,
                        [action.payload.team2]: team2results,
                    };
                    return {
                        ...tournament,
                        group: newGroup,
                    };
                }

                return tournament;
            });
        default:
            return state;
    }
};
