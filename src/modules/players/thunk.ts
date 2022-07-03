import { ThunkActionResult } from '../index';
import { assignPlayerToRoster, updateTeamRoster } from '../teams/actions';
import {
    addPremadePlayers,
    assignTeamToPlayer,
    editPlayer,
    editPlayers,
    makePlayersRetired,
    makePlayersTeamless,
    removePlayer,
} from './actions';
import { IPlayer } from '../../types/IPlayer';
import { IRosterIds } from '../../types/IRoster';
import { getPlayerById, getPlayersByIds, getTeamById } from '../../store/selectors';
import { ITeam } from '../../types/ITeam';
import { getRandomInt } from '../../services/randomGenerator';
import { IUpdateRosterData } from '../../types/IUpdateRosterData';
import { createRosterWithPlayer, removePlayersFromRoster } from '../../services/teamService';

export const removePlayersFromTeam = (ids: IPlayer['id'][]): ThunkActionResult<void> => (
    dispatch,
    getState,
) => {
    const state = getState();
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
    dispatch(makePlayersTeamless(ids));
};

export const changePlayersTeam = (player: IPlayer, newTeamId?: ITeam['id']): ThunkActionResult<void> => (
    dispatch,
) => {
    if (player.teamId !== undefined) {
        dispatch(removePlayersFromTeam([player.id]));
    }
    if (newTeamId !== undefined) {
        dispatch(assignPlayerToRoster(newTeamId, player));
        dispatch(assignTeamToPlayer(player.id, newTeamId));
    }
};

export const replacePlayer = (newPlayer: IPlayer, oldPlayer: IPlayer): ThunkActionResult<void> => (dispatch) => {
    const { teamId } = oldPlayer;
    if (teamId === undefined) {
        throw new Error('Replacing player with no team.');
    }
    dispatch(changePlayersTeam(oldPlayer));
    dispatch(changePlayersTeam(newPlayer, teamId));
};

export const addPlayers = (players: IPlayer[]): ThunkActionResult<void> => (dispatch, getState) => {
    const { teams } = getState();
    const teamsToUpdate: Record<string, IRosterIds> = {};
    players.forEach((player) => {
        const { teamId } = player;
        if (teamId !== undefined) {
            if (teamsToUpdate[teamId]) {
                teamsToUpdate[teamId] = createRosterWithPlayer(player, teamsToUpdate[teamId]);
            } else {
                const teamData = teams.find((iteratedTeam) => iteratedTeam.id === teamId);
                if (teamData) {
                    teamsToUpdate[teamId] = createRosterWithPlayer(player, teamData.roster);
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
        dispatch(changePlayersTeam(player, newTeam?.id));
    }
    dispatch(editPlayer(newData));
};

export const deletePlayer = (id: string): ThunkActionResult<void> => (dispatch) => {
    dispatch(removePlayersFromTeam([id]));
    dispatch(removePlayer(id));
};

export const retirePlayers = (ids: string | string[]): ThunkActionResult<void> => (dispatch) => {
    const idsAsArray = Array.isArray(ids) ? ids : [ids];
    dispatch(removePlayersFromTeam(idsAsArray));
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
