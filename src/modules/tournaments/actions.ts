import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { PlayoffNode } from '../../types/IPlayoff';
import { ITournament } from '../../types/ITournament';
import { ITeam } from '../../types/ITeam';
import { IPlayer } from '../../types/IPlayer';

export const addTournament = (
    name: string,
    teamCount: number,
    groupsCount: number,
    isForFame: boolean,
    playoffTeamCount: number,
) => action(types.ADD_TOURNAMENT, {
    name, teamCount, groupsCount, isForFame, playoffTeamCount,
});

export const addTeamToTournamentGroup = (
    tournamentId: ITournament['id'],
    groupName: string,
    indexInGroup: number,
    teamId?: ITeam['id'],
) => action(types.ADD_TEAM_TO_TOURNAMENT_GROUP, {
    tournamentId,
    teamId,
    groupName,
    indexInGroup,
});

export const addTeamToPlayoffNode = (
    tournamentId: ITournament['id'],
    nodeId: PlayoffNode['id'],
    part: 0 | 1,
    teamId?: ITeam['id'],
) => action(types.ADD_TEAM_TO_PLAYOFF_NODE, {
    tournamentId,
    nodeId,
    part,
    teamId,
});

export const addResultToGroup = (
    tournamentId: ITournament['id'],
    team1: ITeam['id'],
    team2: ITeam['id'],
    score: [number, number],
) => action(types.ADD_RESULT_TO_GROUP, {
    tournamentId,
    team1,
    team2,
    score,
});

export const addResultToPlayoff = (
    tournamentId: ITournament['id'],
    nodeId: PlayoffNode['id'],
    score: [number, number],
) => action(types.ADD_RESULT_TO_PLAYOFF, {
    tournamentId,
    nodeId,
    score,
});

export const recordTournamentEnd = (tournamentId: ITournament['id'], placements?: string[], mvpId?: IPlayer['id']) =>
    action(types.RECORD_TOURNAMENT_END, { tournamentId, placements, mvpId });
