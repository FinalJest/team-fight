import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Path } from '../../enums/Path';
import { FightPage } from '../FightPage';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { Results } from '../../types/Results';
import { addResultToGroup, addResultToPlayoff } from '../../modules/tournaments/actions';
import { resultsToScore } from '../../services/fightSimulator';
import { parseMatchId } from '../../services/matchService';
import { TournamentFightType } from '../../types/TournamentFightType';

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

    const [type, team1, team2, nodeId] = parsedMatchId;

    const handleFight = (result: Results): void => {
        const convertedResults = resultsToScore(result);
        if (type === TournamentFightType.Group) {
            dispatch(addResultToGroup(tournamentId, team1, team2, convertedResults));
        } else if (type === TournamentFightType.Playoff && nodeId !== undefined) {
            dispatch(addResultToPlayoff(tournamentId, nodeId, convertedResults));
        }
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
