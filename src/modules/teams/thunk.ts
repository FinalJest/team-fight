import { nanoid } from 'nanoid';
import { ThunkActionResult } from '../index';
import { generateRoster } from '../../services/playerService';
import { addTeam, removeTeam, toggleTeamDisabled } from './actions';
import { addPremadePlayers, makePlayersTeamless, removePlayers } from '../players/actions';

export const createTeam = (
    name: string,
    logoUrl: string,
    shouldGeneratePlayers?: boolean,
    isRookieTeam?: boolean,
): ThunkActionResult<void> => (dispatch) => {
    const teamId = nanoid();
    const teamData = {
        id: teamId,
        name,
        logoUrl,
        fame: 0,
        history: [],
        isDisabled: false,
    };
    if (shouldGeneratePlayers) {
        generateRoster(teamId, isRookieTeam).then((playerRoster) => {
            dispatch(addPremadePlayers([...Object.values(playerRoster)]));
            const roster = {
                top: playerRoster.top?.id,
                jungle: playerRoster.jungle?.id,
                mid: playerRoster.mid?.id,
                carry: playerRoster.carry?.id,
                support: playerRoster.support?.id,
            };
            dispatch(addTeam({
                ...teamData,
                roster,
            }));
        });
    } else {
        dispatch(addTeam({
            ...teamData,
            roster: {},
        }));
    }
};

export const deleteTeam = (
    id: string,
    shouldDeletePlayers?: boolean,
): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    const players = state.players.filter((player) => player.teamId === id);
    const playersIds = players.map((player) => player.id);
    if (shouldDeletePlayers) {
        dispatch(removePlayers(playersIds));
    } else {
        dispatch(makePlayersTeamless(playersIds));
    }
    dispatch(removeTeam(id));
};

export const toggledTeamDisableStatus = (
    id: string,
): ThunkActionResult<void> => (dispatch, getState) => {
    const state = getState();
    const players = state.players.filter((player) => player.teamId === id);
    const playersIds = players.map((player) => player.id);
    dispatch(makePlayersTeamless(playersIds));
    dispatch(toggleTeamDisabled(id));
};
