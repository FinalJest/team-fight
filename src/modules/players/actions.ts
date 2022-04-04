import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { IPlayer } from '../../types/IPlayer';

export const addPremadePlayers = (players: IPlayer[]) => action(types.ADD_PREMADE_PLAYERS, players);
