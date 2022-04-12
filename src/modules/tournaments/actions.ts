import { action } from 'typesafe-actions';

import * as types from './actionTypes';

export const addTournament = (name: string, teamCount: number) => action(types.ADD_TOURNAMENT, { name, teamCount });
