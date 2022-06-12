import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { TournamentFightType } from '../../types/TournamentFightType';

export const addTournament = (
    name: string,
    teamCount: number,
    groupsCount: number,
    isForFame: boolean,
) => action(types.ADD_TOURNAMENT, {
    name, teamCount, groupsCount, isForFame,
});

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

export const addResult = (
    tournamentId: string,
    type: TournamentFightType,
    team1: string,
    team2: string,
    score?: [number, number],
) => action(types.ADD_RESULT, {
    tournamentId,
    type,
    team1,
    team2,
    score,
});

export const recordTournamentEnd = (tournamentId: string, placements?: string[], mvpId?: string) =>
    action(types.RECORD_TOURNAMENT_END, { tournamentId, placements, mvpId });
