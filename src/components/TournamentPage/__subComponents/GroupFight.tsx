import React from 'react';
import { GroupResult } from '../../../types/IGroup';
import { TournamentFightType } from '../../../types/TournamentFightType';
import { ITeam } from '../../../types/ITeam';
import { Fight } from './Fight';

interface GroupFightProps {
    result: GroupResult;
    team1: ITeam['id'] | null;
    team2: ITeam['id'] | null;
}

export const GroupFight: React.FC<GroupFightProps> = ({ result, team1, team2 }) => {
    if (!team1 || !team2) {
        return null;
    }

    if (!result) {
        return (<Fight type={TournamentFightType.Group} team1={team1} team2={team2} />);
    }

    return <span>{result.join(':')}</span>;
};
