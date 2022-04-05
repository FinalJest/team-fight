import { ReduxState } from '../modules';
import { ITeam } from '../types/ITeam';
import { IPlayer } from '../types/IPlayer';

export const getTeams = (state: ReduxState): ITeam[] => state.teams;

export const getTeamById = (id?: string) =>
    (state: ReduxState): ITeam | undefined => state.teams.find((team) => team.id === id);

export const getPlayers = (state: ReduxState): IPlayer[] => state.players;

export const getPlayerById = (id?: string) =>
    (state: ReduxState): IPlayer | undefined => state.players.find((player) => player.id === id);

export const getPlayersByTeamId = (teamId?: string | string[]) =>
    (state: ReduxState): IPlayer[] => state.players.filter((player) =>
        (Array.isArray(teamId)
            ? (player.teamId !== undefined && teamId.includes(player.teamId))
            : player.teamId === teamId));
