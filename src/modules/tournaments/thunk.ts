import { batch } from 'react-redux';
import { ThunkActionResult } from '..';
import { getFameFromPlacement } from '../../services/fameService';
import { getSortedPlacements } from '../../services/groupService';
import { getStrongestPlayer } from '../../services/playerService';
import { getMainRosterPlayers } from '../../store/selectors';
import { IPlacement } from '../../types/IPlacement';
import { addFameToPlayers, addFameToTeams } from '../actions';
import { recordTournamentEnd } from './actions';

export const finishTournament = (id?: string): ThunkActionResult<void> => (dispatch, getState) => {
    if (id === undefined) {
        return;
    }

    const state = getState();

    let placements: IPlacement[] = [];

    state.tournaments.forEach((tournament) => {
        if (tournament.playoff) {
            placements = []; // TODO: playoff logic
        } else if (tournament.group) {
            placements = getSortedPlacements(tournament.group.results);
        }
    });

    const formattedPlacements = placements.map((placement) => placement.id);
    let famedPlayers = {};
    let famedTeams = {};
    let mvpId: string | undefined;

    for (let i = 0; i < Math.min(3, formattedPlacements.length); i++) {
        const teamId = formattedPlacements[i];
        const roster = getMainRosterPlayers(teamId)(state);
        mvpId = i === 0 ? getStrongestPlayer(roster)?.id : mvpId;
        const fameFromPlacement = getFameFromPlacement(i);
        for (let j = 0; j < roster.length; j++) {
            const player = roster[j];
            famedPlayers = {
                ...famedPlayers,
                [player.id]: Math.floor(fameFromPlacement * (player.id === mvpId ? 1.5 : 1)),
            };
        }
        famedTeams = {
            ...famedTeams,
            [teamId]: fameFromPlacement,
        };
    }

    batch(() => {
        dispatch(addFameToPlayers(famedPlayers));
        dispatch(addFameToTeams(famedTeams));
        dispatch(recordTournamentEnd(id, formattedPlacements, mvpId));
    });
};
