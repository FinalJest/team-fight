import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { Results } from '../../../types/Results';

export const setTeam = (id: string, index: 0 | 1) => action(types.SET_TEAM, { id, index });
export const addResults = (results: Results) => action(types.ADD_RESULTS, results);
