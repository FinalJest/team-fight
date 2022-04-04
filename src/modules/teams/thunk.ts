import { nanoid } from 'nanoid';
import { ThunkActionResult } from '../index';
import { generateRoster } from '../../services/playerGenerator';
import { addTeam } from './actions';
import { addPremadePlayers } from '../players/actions';

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
