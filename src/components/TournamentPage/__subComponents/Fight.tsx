import React from 'react';
import { Link } from 'react-router-dom';
import { useTournamentContext } from '../TournamentContext';
import { Path } from '../../../enums/Path';
import { getMatchId } from '../../../services/matchService';
import { TournamentFightType } from '../../../types/TournamentFightType';
import { ITeam } from '../../../types/ITeam';
import { PlayoffNode } from '../../../types/IPlayoff';

interface FightProps {
    type: TournamentFightType;
    team1?: ITeam['id'];
    team2?: ITeam['id'];
    nodeId?: PlayoffNode['id'];
}

export const Fight: React.FC<FightProps> = ({
    type, team1, team2, nodeId,
}) => {
    const { id } = useTournamentContext();

    if (!team1 || !team2) {
        return null;
    }

    return (
        <Link to={`/${Path.Tournaments}/${id}/${getMatchId(type, team1, team2, nodeId)}`}>
            Fight
        </Link>
    );
};
