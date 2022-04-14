import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Path } from '../../enums/Path';
import { FightPage } from '../FightPage';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { Results } from '../../types/Results';
import { addResult } from '../../modules/tournaments/actions';
import { resultsToScore } from '../../services/fightSimulator';
import { parseMatchId } from '../../services/matchService';

export const TournamentFightSubpage: React.FC = () => {
    const { tournamentId, matchId } = useParams();
    const dispatch = useReduxDispatch();

    if (!tournamentId || !matchId) {
        return null;
    }

    const parsedMatchId = parseMatchId(matchId);

    if (!parsedMatchId) {
        return null;
    }

    const [type, team1, team2] = parsedMatchId;

    const handleFight = (result: Results): void => {
        const convertedResults = resultsToScore(result);
        dispatch(addResult(tournamentId, type, team1, team2, convertedResults));
    };

    return (
        <div>
            <Link to={`/${Path.Tournaments}/${tournamentId}`}>
                Back
            </Link>
            <FightPage
                predeterminedTeams={[team1, team2]}
                onFight={handleFight}
            />
        </div>
    );
};
