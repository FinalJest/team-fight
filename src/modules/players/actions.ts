import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { IPlayer } from '../../types/IPlayer';

export const addPremadePlayers = (players: IPlayer[]) => action(types.ADD_PREMADE_PLAYERS, players);
export const editPlayer = (newData: Partial<IPlayer> & { id: IPlayer['id'] }) => action(types.EDIT_PLAYER, newData);
export const removePlayer = (id: string) => action(types.REMOVE_PLAYER, id);
