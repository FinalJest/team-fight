import { ThunkActionResult } from '../index';
import { updateTeamRoster } from '../teams/actions';
import { removePlayer } from './actions';

export const deletePlayer = (id: string): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    const player = state.players.find((item) => item.id === id);
    const team = state.teams.find((item) => item.id === player?.teamId);

    if (team && player) {
        dispatch(updateTeamRoster(team.id, { [player.position]: undefined }));
    }
    dispatch(removePlayer(id));
};
