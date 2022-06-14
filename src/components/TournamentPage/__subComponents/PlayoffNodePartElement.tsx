import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReduxState } from '../../../modules';
import { getTeamById } from '../../../store/selectors';
import { NO_TEAM_VALUE, TeamSelect } from '../../TeamSelect';
import { PlayoffNode } from '../../../types/IPlayoff';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { addTeamToPlayoffNode } from '../../../modules/tournaments/actions';
import { useTournamentContext } from '../TournamentContext';
import { usePlayoffContext } from '../PlayoffContext';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';

const StyledPart = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 220px;
    padding: 8px;
    border: 1px solid black;
`;

const TeamName = styled.span`
    display: flex;
    align-items: center;
    column-gap: 8px;
    flex: 1;
`;

const StyledScore = styled.span`
    flex: 0 0 30px;
`;

interface PlayoffNodePartProps {
    data: PlayoffNode;
    part: 0 | 1;
}

export const PlayoffNodePartElement: React.FC<PlayoffNodePartProps> = ({ part, data }) => {
    const { teamId, score, prevNode } = data.parts[part];
    const teamName = useSelector((state: ReduxState) => getTeamById(teamId ?? undefined)(state)?.name);
    const dispatch = useReduxDispatch();
    const { id, isFinished } = useTournamentContext();
    const { selectedTeams } = usePlayoffContext();
    const handleChangeTeam = (newTeamId: string) => {
        dispatch(addTeamToPlayoffNode(id, data.id, part, newTeamId));
    };

    return (
        <StyledPart>
            {prevNode !== undefined || isFinished
                ? (
                    <TeamName>
                        {teamId !== null && <TeamLogo id={teamId} size={ComponentSize.S} />}
                        {teamName}
                    </TeamName>
                )
                : (
                    <TeamSelect
                        currentTeam={teamId ?? NO_TEAM_VALUE}
                        onTeamSelect={handleChangeTeam}
                        excludedTeams={selectedTeams}
                    />
                )}
            {score !== undefined && <StyledScore>{score}</StyledScore>}
        </StyledPart>
    );
};
