import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTeamById } from '../../../store/selectors';
import { Logo } from '../../Logo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { TeamSelect } from '../../TeamSelect';

const Container = styled.div`
    width: 200px;
`;

interface TeamBlockProps {
    currentTeam?: string;
    onTeamSelect(id: string): void;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({ currentTeam, onTeamSelect }) => {
    const team = useSelector(getTeamById(currentTeam));

    return (
        <Container>
            <Logo size={ComponentSize.L} src={team?.logoUrl} />
            <TeamSelect onTeamSelect={onTeamSelect} currentTeam={currentTeam} />
        </Container>
    );
};
