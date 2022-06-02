import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { IPlayer } from '../../types/IPlayer';

type FameData = Record<IPlayer['id'], number>;
type EditData = Partial<IPlayer> & { id: IPlayer['id'] };

export const addPremadePlayers = (players: IPlayer[]) => action(types.ADD_PREMADE_PLAYERS, players);
export const editPlayer = (newData: EditData) => action(types.EDIT_PLAYER, newData);
export const editPlayers = (newData: Record<IPlayer['id'], Partial<IPlayer>>) => action(types.EDIT_PLAYERS, newData);
export const removePlayer = (id: IPlayer['id']) => action(types.REMOVE_PLAYER, id);
export const removePlayers = (ids: IPlayer['id'][]) => action(types.REMOVE_PLAYERS, ids);
export const makePlayersTeamless = (ids: IPlayer['id'][]) => action(types.MAKE_PLAYERS_TEAMLESS, ids);
export const addFameToPlayers = (data: FameData, mvpId?: IPlayer['id']) =>
    action(types.ADD_FAME, { data, mvpId });
export const makePlayersRetired = (ids: IPlayer['id'][]) => action(types.MAKE_PLAYERS_RETIRED, ids);
