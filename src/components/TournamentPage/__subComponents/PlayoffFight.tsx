import React from 'react';
import { TournamentFightType } from '../../../types/TournamentFightType';
import { ITeam } from '../../../types/ITeam';
import { Fight } from './Fight';
import { PlayoffNode } from '../../../types/IPlayoff';

interface GroupFightProps {
    team1?: ITeam['id'];
    team2?: ITeam['id'];
    nodeId: PlayoffNode['id'];
}

export const PlayoffFight: React.FC<GroupFightProps> = ({ nodeId, team1, team2 }) => {
    if (!team1 || !team2) {
        return null;
    }

    return (<Fight type={TournamentFightType.Playoff} team1={team1} team2={team2} nodeId={nodeId} />);
};
