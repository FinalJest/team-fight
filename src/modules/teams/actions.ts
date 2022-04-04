import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { ITeam } from '../../types/ITeam';
import { IRosterIds } from '../../types/IRoster';

export const addTeam = (team: ITeam) => action(types.ADD_TEAM, team);
export const updateTeamRoster = (id: string, roster: Partial<IRosterIds>) => action(types.UPDATE_TEAM_ROSTER, {
    id,
    roster,
});
