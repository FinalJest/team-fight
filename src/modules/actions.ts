import { action } from 'typesafe-actions';

import * as types from './actionTypes';

// Reason for 'any': Redux/TS/typesafe-actions interactions will cause a loop of declaration if typed properly
export const resetState = (newState?: any) => action(types.RESET_STATE, newState);

export * from './players/actions';
export * from './teams/actions';
export * from './tournaments/actions';
