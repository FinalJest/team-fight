import { ThunkActionResult } from '../index';
import { updateTeamRoster } from '../teams/actions';
import { editPlayer, removePlayer } from './actions';
import { IPlayer } from '../../types/IPlayer';

export const updatePlayer = (newData: Partial<IPlayer> & { id: string }): ThunkActionResult<void> => (
    dispatch,
    getState,
) => {
    const state = getState();
    const player = state.players.find((item) => item.id === newData.id);
    const team = state.teams.find((item) => item.id === player?.teamId);

    if (team && player) {
        dispatch(updateTeamRoster(
            team.id,
            { [player.position]: undefined, other: [...team.roster.other ?? [], player.id] },
        ));
    }
    dispatch(editPlayer(newData));
};

export const deletePlayer = (id: string): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    const player = state.players.find((item) => item.id === id);
    const team = state.teams.find((item) => item.id === player?.teamId);

    if (team && player) {
        dispatch(updateTeamRoster(team.id, { [player.position]: undefined }));
    }
    dispatch(removePlayer(id));
};
