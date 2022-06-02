import React from 'react';
import { Link } from 'react-router-dom';
import { useTournamentContext } from '../TournamentContext';
import { GroupResult } from '../../../types/IGroup';
import { Path } from '../../../enums/Path';
import { getMatchId } from '../../../services/matchService';
import { TournamentFightType } from '../../../types/TournamentFightType';
import { ITeam } from '../../../types/ITeam';

interface FightProps {
    result: GroupResult;
    type: TournamentFightType;
    team1?: ITeam['id'];
    team2?: ITeam['id'];
}

export const Fight: React.FC<FightProps> = ({
    result, type, team1, team2,
}) => {
    const { id } = useTournamentContext();

    if (!team1 || !team2) {
        return null;
    }

    if (!result) {
        return (
            <Link to={`/${Path.Tournaments}/${id}/${getMatchId(type, team1, team2)}`}>
                Fight
            </Link>
        );
    }

    return <span>{result.join(':')}</span>;
};
