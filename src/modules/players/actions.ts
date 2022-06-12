import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { IPlayer } from '../../types/IPlayer';
import { ITeam } from '../../types/ITeam';
import { ITournament } from '../../types/ITournament';

interface PlayerTournamentData {
    place: number;
    teamId: ITeam['id'];
    isMvp: boolean;
}

type TournamentData = Record<IPlayer['id'], PlayerTournamentData>;
type EditData = Partial<IPlayer> & { id: IPlayer['id'] };

export const addPremadePlayers = (players: IPlayer[]) => action(types.ADD_PREMADE_PLAYERS, players);
export const editPlayer = (newData: EditData) => action(types.EDIT_PLAYER, newData);
export const editPlayers = (newData: Record<IPlayer['id'], Partial<IPlayer>>) => action(types.EDIT_PLAYERS, newData);
export const removePlayer = (id: IPlayer['id']) => action(types.REMOVE_PLAYER, id);
export const removePlayers = (ids: IPlayer['id'][]) => action(types.REMOVE_PLAYERS, ids);
export const makePlayersTeamless = (ids: IPlayer['id'][]) => action(types.MAKE_PLAYERS_TEAMLESS, ids);
export const recordTournamentParticipation = (
    data: TournamentData,
    tournamentId: ITournament['id'],
    isForFame: boolean,
) =>
    action(types.RECORD_TOURNAMENT_PARTICIPATION, { data, tournamentId, isForFame });
export const makePlayersRetired = (ids: IPlayer['id'][]) => action(types.MAKE_PLAYERS_RETIRED, ids);
