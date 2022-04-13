import { action } from 'typesafe-actions';

import * as types from './actionTypes';

export const addTournament = (
    name: string,
    teamCount: number,
    groupsCount: number,
) => action(types.ADD_TOURNAMENT, { name, teamCount, groupsCount });

export const addTeamToTournamentGroup = (
    tournamentId: string,
    groupName: string,
    indexInGroup: number,
    teamId?: string,
) => action(types.ADD_TEAM_TO_TOURNAMENT_GROUP, {
    tournamentId,
    teamId,
    groupName,
    indexInGroup,
});
