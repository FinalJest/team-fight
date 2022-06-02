import React from 'react';
import { NO_TEAM_VALUE, TeamSelect } from '../../TeamSelect';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { addTeamToTournamentGroup } from '../../../modules/tournaments/actions';
import { useTournamentContext } from '../TournamentContext';

interface MatchTeamSelectProps {
    currentTeam: string;
    groupName: string;
    indexInGroup: number;
    excludedTeams?: Set<string>;
}

export const MatchTeamSelect: React.FC<MatchTeamSelectProps> = ({
    currentTeam,
    excludedTeams = new Set(),
    groupName,
    indexInGroup,
}) => {
    const { id } = useTournamentContext();
    const dispatch = useReduxDispatch();
    const handleTeamSelect = (teamId: string): void => {
        dispatch(addTeamToTournamentGroup(
            id,
            groupName,
            indexInGroup,
            teamId !== NO_TEAM_VALUE ? teamId : undefined,
        ));
    };
    return (
        <TeamSelect excludedTeams={excludedTeams} currentTeam={currentTeam} onTeamSelect={handleTeamSelect} />
    );
};
