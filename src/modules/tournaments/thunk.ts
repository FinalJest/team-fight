import { batch } from 'react-redux';
import { ThunkActionResult } from '..';
import { getSortedPlacementsForGroups } from '../../services/groupService';
import { getStrongestPlayer } from '../../services/playerService';
import { getMainRosterPlayers } from '../../store/selectors';
import { recordTournamentParticipation, recordTournamentResult } from '../actions';
import { recordTournamentEnd } from './actions';
import { getPlayoffPlacements } from '../../services/playoffService';

export const finishTournament = (id?: string): ThunkActionResult<void> => (dispatch, getState) => {
    if (id === undefined) {
        return;
    }

    const state = getState();

    let placements: string[] = [];

    const tournament = state.tournaments.find((tourney) => tourney.id === id);

    if (!tournament) {
        return;
    }

    const groupPlacements = tournament.group
        ? getSortedPlacementsForGroups(tournament.group).map((placement) => placement.id)
        : [];
    if (tournament.playoff) {
        const playoffPlacements = getPlayoffPlacements(tournament.playoff);
        placements = [...playoffPlacements, ...groupPlacements.slice(playoffPlacements.length)];
    } else {
        placements = groupPlacements;
    }

    let playersTournamentData = {};
    let teamsTournamentData = {};
    let mvpId: string | undefined;

    for (let i = 0; i < placements.length; i++) {
        const teamId = placements[i];
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
        dispatch(recordTournamentEnd(id, placements, mvpId));
    });
};
