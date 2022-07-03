import { ReduxState } from '../modules';
import { ITeam, TeamWithStats } from '../types/ITeam';
import { IPlayer } from '../types/IPlayer';
import { ITournament } from '../types/ITournament';
import { getPlayersMental, getPlayersPower } from '../services/fightSimulator';
import { IRoster } from '../types/IRoster';
import { getRosterFame } from '../services/teamService';

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

export const getMainRoster = (teamId?: string) => (state: ReduxState): IRoster | undefined => {
    const team = getTeamById(teamId)(state);
    if (!team) {
        return undefined;
    }

    return {
        top: getPlayerById(team.roster.top)(state),
        jungle: getPlayerById(team.roster.jungle)(state),
        mid: getPlayerById(team.roster.mid)(state),
        carry: getPlayerById(team.roster.carry)(state),
        support: getPlayerById(team.roster.support)(state),
    };
};

export const getTeamPower = (state: ReduxState, teamId?: string): number =>
    getPlayersPower(getMainRosterPlayers(teamId)(state));

export const getTeamMental = (state: ReduxState, teamId?: string): number =>
    getPlayersMental(getMainRosterPlayers(teamId)(state));

export const getTeams = (state: ReduxState): ITeam[] => state.teams;

export const getEnabledTeams = (state: ReduxState): ITeam[] => getTeams(state).filter((team) => !team.isDisabled);

export const getTeamsWithStats = (state: ReduxState): TeamWithStats[] =>
    state.teams.map((team) => ({
        ...team,
        power: getTeamPower(state, team.id),
        mental: getTeamMental(state, team.id),
        rosterFame: getRosterFame(getMainRoster(team.id)(state)),
    }));

export const getTeamsRecord = (state: ReduxState): Record<ITeam['id'], TeamWithStats> =>
    getTeamsWithStats(state)
        .reduce<Record<ITeam['id'], TeamWithStats>>((result, team) =>
        ({ ...result, [team.id]: team }), {});

export const getTeamsThatDidTransfer = (state: ReduxState): ITeam['id'][] => state.freeMarket.teamsThatDidTransfer;

export const getPlayers = (state: ReduxState): IPlayer[] => state.players;

export const getPlayersRecord = (state: ReduxState): Record<IPlayer['id'], IPlayer> =>
    getPlayers(state).reduce((result, player) => ({ ...result, [player.id]: player }), {});

export const getPlayersByTeamId = (teamId?: string | string[]) =>
    (state: ReduxState): IPlayer[] => state.players.filter((player) =>
        (Array.isArray(teamId)
            ? (player.teamId !== undefined && teamId.includes(player.teamId))
            : player.teamId === teamId));

export const getFreeMarketPlayers = (state: ReduxState): IPlayer[] => getPlayersByTeamId()(state)
    .filter((player) => !player.isRetired);

export const getTournaments = (state: ReduxState): ITournament[] => state.tournaments;

export const getTournamentById = (id?: string) =>
    (state: ReduxState): ITournament | undefined => state.tournaments.find((tournament) => tournament.id === id);

export const getLastFamedTournament = (state: ReduxState): ITournament | undefined => {
    for (let i = state.tournaments.length - 1; i >= 0; i--) {
        const tourney = state.tournaments[i];
        if (tourney.isFinished && tourney.isForFame) {
            return tourney;
        }
    }
    return undefined;
};
