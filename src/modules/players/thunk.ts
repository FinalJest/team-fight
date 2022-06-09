import { DispatchActions, ReduxState, ThunkActionResult } from '../index';
import { updateTeamRoster } from '../teams/actions';
import {
    addPremadePlayers, editPlayer, editPlayers, makePlayersRetired, removePlayer,
} from './actions';
import { IPlayer } from '../../types/IPlayer';
import { IRosterIds } from '../../types/IRoster';
import { getPlayerById, getPlayersByIds, getTeamById } from '../../store/selectors';
import { ITeam } from '../../types/ITeam';
import { getRandomInt } from '../../services/randomGenerator';
import { IUpdateRosterData } from '../../types/IUpdateRosterData';

const removePlayersFromRoster = (players: IPlayer[], roster: IRosterIds): IRosterIds =>
    players.reduce((result, player) => {
        const wasOnMainTeam = roster[player.position] === player.id;
        return wasOnMainTeam
            ? { ...result, [player.position]: undefined }
            : { ...result, other: result.other && roster.other!.filter((sub) => sub !== player.id) };
    }, { other: roster.other });

const addPlayerToRoster = (player: IPlayer, roster: IRosterIds): IRosterIds => {
    const hasPlayerOnMainTeam = Boolean(roster[player.position]);
    return hasPlayerOnMainTeam
        ? { other: roster.other ? [...roster.other, player.id] : [player.id] }
        : { [player.position]: player.id };
};

const removePlayersFromTeam = (ids: IPlayer['id'][], dispatch: DispatchActions, state: ReduxState): void => {
    const players = getPlayersByIds(ids)(state);

    if (players) {
        const teams: Record<ITeam['id'], IPlayer[]> = {};
        players.forEach((player) => {
            if (player.teamId !== undefined) {
                if (teams[player.teamId]) {
                    teams[player.teamId].push(player);
                } else {
                    teams[player.teamId] = [player];
                }
            }
        });
        const newRosters = Object.entries(teams).map(([teamId, playersFromTeam]) => {
            const team = getTeamById(teamId)(state);
            if (!team) {
                return undefined;
            }
            return {
                id: teamId,
                roster: removePlayersFromRoster(playersFromTeam, team.roster),
            };
        }).filter<IUpdateRosterData>((data): data is IUpdateRosterData => data !== undefined);
        dispatch(updateTeamRoster(newRosters));
    }
};

export const transferPlayer = (player: IPlayer, oldTeam?: ITeam, newTeam?: ITeam): ThunkActionResult<void> => (
    dispatch,
    getState,
) => {
    const state = getState();
    if (oldTeam?.id !== undefined) {
        removePlayersFromTeam([player.id], dispatch, state);
    }
    if (newTeam?.id !== undefined) {
        const newRoster = addPlayerToRoster(player, newTeam.roster);
        dispatch(updateTeamRoster({
            id: newTeam.id,
            roster: newRoster,
        }));
    }
};

export const addPlayers = (players: IPlayer[]): ThunkActionResult<void> => (dispatch, getState) => {
    const { teams } = getState();
    const teamsToUpdate: Record<string, IRosterIds> = {};
    players.forEach((player) => {
        const { teamId } = player;
        if (teamId !== undefined) {
            if (teamsToUpdate[teamId]) {
                teamsToUpdate[teamId] = addPlayerToRoster(player, teamsToUpdate[teamId]);
            } else {
                const teamData = teams.find((iteratedTeam) => iteratedTeam.id === teamId);
                if (teamData) {
                    teamsToUpdate[teamId] = addPlayerToRoster(player, teamData.roster);
                }
            }
        }
    });
    const rostersToUpdate = Object.entries(teamsToUpdate).map(([id, roster]) => ({ id, roster }));
    if (rostersToUpdate.length) {
        dispatch(updateTeamRoster(rostersToUpdate));
    }
    dispatch(addPremadePlayers(players));
};

export const updatePlayer = (newData: Partial<IPlayer> & { id: string }): ThunkActionResult<void> => (
    dispatch,
    getState,
) => {
    const state = getState();
    const player = getPlayerById(newData.id)(state);
    const oldTeam = getTeamById(player?.teamId)(state);
    const newTeam = getTeamById(newData.teamId)(state);

    if (player && newTeam?.id !== oldTeam?.id) {
        dispatch(transferPlayer(player, oldTeam, newTeam));
    }
    dispatch(editPlayer(newData));
};

export const deletePlayer = (id: string): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    removePlayersFromTeam([id], dispatch, state);
    dispatch(removePlayer(id));
};

export const retirePlayers = (ids: string | string[]): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    const idsAsArray = Array.isArray(ids) ? ids : [ids];
    removePlayersFromTeam(idsAsArray, dispatch, state);
    dispatch(makePlayersRetired(idsAsArray));
};

export const progressPlayers = (): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    const retiredPlayers: string[] = [];
    const updatedPlayers = state.players.reduce((result, player) => {
        if (player.isRetired) {
            return result;
        }

        let skillChange = 0;
        let potentialChange = 0;
        if (getRandomInt(10, 1) <= player.potential) {
            skillChange = getRandomInt(21, 1);
            potentialChange = -1;
        } else if (getRandomInt(10, 1) > player.potential) {
            skillChange = -1 * getRandomInt(21, 1);
        }
        const newSkill = player.skill + skillChange;

        if (newSkill < 1) {
            retiredPlayers.push(player.id);
        }

        return {
            ...result,
            [player.id]: {
                ...player,
                skill: newSkill,
                potential: Math.max(player.potential + potentialChange, 0),
            },
        };
    }, {});

    dispatch(editPlayers(updatedPlayers));

    if (retiredPlayers.length) {
        dispatch(retirePlayers(retiredPlayers));
    }
};
