import { ThunkActionResult } from '..';
import { getPoints, getWins } from '../../services/groupGenerator';
import { getMainRosterPlayers } from '../../store/selectors';
import { recordTournamentEnd } from './actions';

const isStronger = (currentMax: number[], contender: number[]): boolean => {
    for (let i = 0; i < contender.length; i++) {
        if (currentMax[i] === undefined) {
            return true;
        }
        if (contender[i] > currentMax[i]) {
            return true;
        }
        if (contender[i] === currentMax[i]) {
            if (i === contender.length - 1) {
                return Math.random() > 0.5;
            }
        } else {
            return false;
        }
    }
    return false;
};

export const finishTournament = (id?: string): ThunkActionResult<void> => (dispatch, getState) => {
    if (id === undefined) {
        return;
    }

    const state = getState();

    let winnerId: string | undefined;

    state.tournaments.forEach((tournament) => {
        if (tournament.playoff) {
            winnerId = undefined; // TODO: playoff logic
        } else if (tournament.group) {
            Object.entries(tournament.group.results).reduce((max, [tournamentId, teamResult]) => {
                const wins = getWins(teamResult);
                const points = getPoints(teamResult);

                if (isStronger(max, [points, wins])) {
                    winnerId = tournamentId;
                    return [points, wins];
                }

                return max;
            }, [-1, -1]);
        }
    });

    const players = getMainRosterPlayers(winnerId)(state);
    let mvpId: string | undefined;

    players.reduce((max, player) => {
        if (isStronger(max, [player.skill, player.mental])) {
            mvpId = player.id;
            return [player.skill, player.mental];
        }
        return max;
    }, [-1, -1]);

    dispatch(recordTournamentEnd(id, winnerId, mvpId));
};
