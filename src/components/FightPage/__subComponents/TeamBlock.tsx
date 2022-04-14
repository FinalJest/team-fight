import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { getTeamById } from '../../../store/selectors';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { TeamSelect } from '../../TeamSelect';

const Container = styled.div`
    width: 200px;
`;

interface TeamBlockProps {
    currentTeam: string;
    onTeamSelect(id: string): void;

    isDisabled?: boolean;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({ isDisabled, currentTeam, onTeamSelect }) => {
    const team = useSelector(getTeamById(currentTeam));

    return (
        <Container>
            <TeamLogo size={ComponentSize.L} src={team?.logoUrl} id={team?.id} />
            {isDisabled
                ? <Typography variant="h4">{team?.name}</Typography>
                : <TeamSelect onTeamSelect={onTeamSelect} currentTeam={currentTeam} />}
        </Container>
    );
};
