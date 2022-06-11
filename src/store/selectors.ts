import { ReduxState } from '../modules';
import { ITeam } from '../types/ITeam';
import { IPlayer } from '../types/IPlayer';
import { ITournament } from '../types/ITournament';
import { getPlayersMental, getPlayersPower } from '../services/fightSimulator';

type TeamWithStats = ITeam & { power: number; mental: number; };

export const getTeamById = (id?: string) =>
    (state: ReduxState): ITeam | undefined => state.teams.find((team) => team.id === id);

export const getPlayerById = (id?: string) =>
    (state: ReduxState): IPlayer | undefined => state.players.find((player) => player.id === id);

export const getPlayersByIds = (ids: string[]) =>
    (state: ReduxState): IPlayer[] => state.players.filter(
        (player) => ids.includes(player.id),
    );

export const getMainRosterPlayers = (teamId?: string) => (state: ReduxState): IPlayer[] => {
    const team = getTeamById(teamId)(state);
    if (!team) {
        return [];
    }
    const playersIds = [
        team.roster.top,
        team.roster.jungle,
        team.roster.mid,
        team.roster.carry,
        team.roster.support,
    ].filter<string>((id): id is string => id !== undefined);
    return getPlayersByIds(playersIds)(state);
};

export const getTeamPower = (state: ReduxState, teamId?: string): number =>
    getPlayersPower(getMainRosterPlayers(teamId)(state));

export const getTeamMental = (state: ReduxState, teamId?: string): number =>
    getPlayersMental(getMainRosterPlayers(teamId)(state));

export const getTeams = (state: ReduxState): ITeam[] => state.teams;

export const getTeamsWithStats = (state: ReduxState): TeamWithStats[] =>
    state.teams.map((team) => ({
        ...team,
        power: getTeamPower(state, team.id),
        mental: getTeamMental(state, team.id),
    }));

export const getTeamsRecord = (state: ReduxState): Record<ITeam['id'], TeamWithStats> =>
    getTeamsWithStats(state)
        .reduce<Record<ITeam['id'], TeamWithStats>>((result, team) =>
        ({ ...result, [team.id]: team }), {});

export const getPlayers = (state: ReduxState): IPlayer[] => state.players;

export const getPlayersRecord = (state: ReduxState): Record<IPlayer['id'], IPlayer> =>
    getPlayers(state).reduce((result, player) => ({ ...result, [player.id]: player }), {});

export const getPlayersByTeamId = (teamId?: string | string[]) =>
    (state: ReduxState): IPlayer[] => state.players.filter((player) =>
        (Array.isArray(teamId)
            ? (player.teamId !== undefined && teamId.includes(player.teamId))
            : player.teamId === teamId));

export const getTournaments = (state: ReduxState): ITournament[] => state.tournaments;

export const getTournamentById = (id?: string) =>
    (state: ReduxState): ITournament | undefined => state.tournaments.find((tournament) => tournament.id === id);
