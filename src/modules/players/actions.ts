import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { IPlayer } from '../../types/IPlayer';

type FameData = Record<IPlayer['id'], number>;

export const addPremadePlayers = (players: IPlayer[]) => action(types.ADD_PREMADE_PLAYERS, players);
export const editPlayer = (newData: Partial<IPlayer> & { id: IPlayer['id'] }) => action(types.EDIT_PLAYER, newData);
export const removePlayer = (id: IPlayer['id']) => action(types.REMOVE_PLAYER, id);
export const removePlayers = (ids: IPlayer['id'][]) => action(types.REMOVE_PLAYERS, ids);
export const makePlayersTeamless = (ids: IPlayer['id'][]) => action(types.MAKE_PLAYERS_TEAMLESS, ids);
export const progressPlayers = () => action(types.PROGRESS_PLAYERS);
export const addFameToPlayers = (data: FameData, mvpId?: IPlayer['id']) =>
    action(types.ADD_FAME, { data, mvpId });
