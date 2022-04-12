import { ThunkActionResult } from '../index';
import { updateTeamRoster } from '../teams/actions';
import { addPremadePlayers, editPlayer, removePlayer } from './actions';
import { IPlayer } from '../../types/IPlayer';
import { IRosterIds } from '../../types/IRoster';
import { getPlayerById, getTeamById } from '../../store/selectors';
import { ITeam } from '../../types/ITeam';

const removePlayerFromRoster = (player: IPlayer, roster: IRosterIds): IRosterIds => {
    const wasOnMainTeam = roster[player.position] === player.id;
    return wasOnMainTeam
        ? { [player.position]: undefined }
        : { other: roster.other && roster.other.filter((sub) => sub !== player.id) };
};

const addPlayerToRoster = (player: IPlayer, roster: IRosterIds): IRosterIds => {
    const hasPlayerOnMainTeam = Boolean(roster[player.position]);
    return hasPlayerOnMainTeam
        ? { other: roster.other ? [...roster.other, player.id] : [player.id] }
        : { [player.position]: player.id };
};

export const transferPlayer = (player: IPlayer, oldTeam?: ITeam, newTeam?: ITeam): ThunkActionResult<void> => (
    dispatch,
) => {
    if (oldTeam?.id !== undefined) {
        const newRoster = removePlayerFromRoster(player, oldTeam.roster);
        dispatch(updateTeamRoster({
            id: oldTeam.id,
            roster: newRoster,
        }));
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
    const player = state.players.find((item) => item.id === id);
    const team = state.teams.find((item) => item.id === player?.teamId);

    if (team && player) {
        dispatch(updateTeamRoster({ id: team.id, roster: { [player.position]: undefined } }));
    }
    dispatch(removePlayer(id));
};
