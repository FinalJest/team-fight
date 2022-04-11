import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { ITeam } from '../../types/ITeam';
import { IRosterIds } from '../../types/IRoster';
import { Position } from '../../enums/Position';

export const addTeam = (team: ITeam) => action(types.ADD_TEAM, team);
export const editTeam = (newData: Partial<ITeam> & { id: string }) => action(types.EDIT_TEAM, newData);

interface IUpdateRosterData {
    id: string;
    roster: IRosterIds;
}

export const updateTeamRoster = (data: IUpdateRosterData | IUpdateRosterData[]) =>
    action(types.UPDATE_TEAM_ROSTER, data);
export const promotePlayer = (teamId: string, playerId: string, position: Position) =>
    action(types.PROMOTE_PLAYER, { playerId, teamId, position });
export const removeTeam = (id: string) => action(types.REMOVE_TEAM, id);
