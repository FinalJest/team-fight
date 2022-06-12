import { batch } from 'react-redux';
import { ThunkActionResult } from '..';
import { getSortedPlacements } from '../../services/groupService';
import { getStrongestPlayer } from '../../services/playerService';
import { getMainRosterPlayers } from '../../store/selectors';
import { IPlacement } from '../../types/IPlacement';
import { recordTournamentParticipation, recordTournamentResult } from '../actions';
import { recordTournamentEnd } from './actions';

export const finishTournament = (id?: string): ThunkActionResult<void> => (dispatch, getState) => {
    if (id === undefined) {
        return;
    }

    const state = getState();

    let placements: IPlacement[] = [];

    const tournament = state.tournaments.find((tourney) => tourney.id === id);

    if (!tournament) {
        return;
    }

    if (tournament.playoff) {
        placements = []; // TODO: playoff logic
    } else if (tournament.group) {
        placements = getSortedPlacements(tournament.group.results);
    }

    const formattedPlacements = placements.map((placement) => placement.id);
    let playersTournamentData = {};
    let teamsTournamentData = {};
    let mvpId: string | undefined;

    for (let i = 0; i < formattedPlacements.length; i++) {
        const teamId = formattedPlacements[i];
        const roster = getMainRosterPlayers(teamId)(state);
        mvpId = i === 0 ? getStrongestPlayer(roster)?.id : mvpId;
        const place = i + 1;
        for (let j = 0; j < roster.length; j++) {
            const player = roster[j];
            playersTournamentData = {
                ...playersTournamentData,
                [player.id]: { teamId, place, isMvp: mvpId === player.id },
            };
        }
        teamsTournamentData = {
            ...teamsTournamentData,
            [teamId]: place,
        };
    }

    batch(() => {
        dispatch(recordTournamentParticipation(playersTournamentData, id, tournament.isForFame));
        dispatch(recordTournamentResult(teamsTournamentData, id, tournament.isForFame));
        dispatch(recordTournamentEnd(id, formattedPlacements, mvpId));
    });
};
