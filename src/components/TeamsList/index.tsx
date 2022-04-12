import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AddTeam } from '../modals/team/AddTeam';
import { Team } from './__subComponents/Team';
import { getTeams } from '../../store/selectors';
import { ButtonsContainer } from '../ButtonsContainer';
import { PageContainer } from '../PageContainer';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 12px;
`;

export const TeamsList: React.FC = () => {
    const teams = useSelector(getTeams);
    return (
        <PageContainer>
            {Boolean(teams.length) && (
                <Container>
                    {teams.map((team) => <Team key={team.id} {...team} />)}
                </Container>
            )}
            <ButtonsContainer>
                <AddTeam />
            </ButtonsContainer>
        </PageContainer>
    );
};
