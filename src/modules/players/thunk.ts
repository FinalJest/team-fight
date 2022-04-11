import { ThunkActionResult } from '../index';
import { updateTeamRoster } from '../teams/actions';
import { addPremadePlayers, editPlayer, removePlayer } from './actions';
import { IPlayer } from '../../types/IPlayer';
import { IRosterIds } from '../../types/IRoster';

const addPlayerToRoster = (player: IPlayer, roster: IRosterIds): IRosterIds => {
    const newRoster = { ...roster };
    if (newRoster[player.position]) {
        if (newRoster.other) {
            newRoster.other.push(player.id);
        } else {
            newRoster.other = [player.id];
        }
    } else {
        newRoster[player.position] = player.id;
    }
    return newRoster;
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
    const player = state.players.find((item) => item.id === newData.id);
    const team = state.teams.find((item) => item.id === player?.teamId);

    if (team && player) {
        dispatch(updateTeamRoster({
            id: team.id,
            roster: { [player.position]: undefined, other: [...team.roster.other ?? [], player.id] },
        }));
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
