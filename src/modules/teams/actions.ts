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

/** These actions could be called directly */
export const promotePlayer = (teamId: ITeam['id'], playerId: IPlayer['id'], position: Position) =>
    action(types.PROMOTE_PLAYER, { playerId, teamId, position });

/** Only use these actions in thunks, do NOT dispatch directly */
export const updateTeamRoster = (data: IUpdateRosterData | IUpdateRosterData[]) =>
    action(types.UPDATE_TEAM_ROSTER, data);
export const assignPlayerToRoster = (teamId: ITeam['id'], player: IPlayer) =>
    action(types.ASSIGN_PLAYER_TO_ROSTER, { teamId, player });
export const removeTeam = (id: ITeam['id']) => action(types.REMOVE_TEAM, id);
export const toggleTeamDisabled = (teamId: ITeam['id']) => action(types.TOGGLE_TEAM_DISABLED, teamId);
export const recordTournamentResult = (data: TeamTournamentData, tournamentId: ITournament['id'], isForFame: boolean) =>
    action(types.RECORD_TOURNAMENT_RESULT, { data, tournamentId, isForFame });
