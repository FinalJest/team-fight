import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { ITeam } from '../../types/ITeam';

export const addTeam = (team: ITeam) => action(types.ADD_TEAM, team);
