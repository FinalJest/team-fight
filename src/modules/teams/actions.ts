import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { ITeam } from '../../types/ITeam';
import { Position } from '../../enums/Position';
import { IPlayer } from '../../types/IPlayer';
import { IUpdateRosterData } from '../../types/IUpdateRosterData';
import { ITournament } from '../../types/ITournament';

export const addTeam = (team: ITeam) => action(types.ADD_TEAM, team);
export const editTeam = (newData: Partial<ITeam> & { id: string }) => action(types.EDIT_TEAM, newData);

type TeamTournamentData = Record<ITeam['id'], number>;

export const updateTeamRoster = (data: IUpdateRosterData | IUpdateRosterData[]) =>
    action(types.UPDATE_TEAM_ROSTER, data);
export const promotePlayer = (teamId: ITeam['id'], playerId: IPlayer['id'], position: Position) =>
    action(types.PROMOTE_PLAYER, { playerId, teamId, position });
export const removeTeam = (id: ITeam['id']) => action(types.REMOVE_TEAM, id);
export const recordTournamentResult = (data: TeamTournamentData, tournamentId: ITournament['id']) =>
    action(types.RECORD_TOURNAMENT_RESULT, { data, tournamentId });
