import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AddTeamModal } from '../modals/team/AddTeamModal';
import { Team } from './__subComponents/Team';
import { getTeams } from '../../store/selectors';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 12px;
`;

const AddModalContainer = styled.div`
    margin-top: 20px;
`;

export const TeamsList: React.FC = () => {
    const teams = useSelector(getTeams);
    return (
        <div>
            <Container>
                {teams.map((team) => <Team key={team.id} {...team} />)}
            </Container>
            <AddModalContainer>
                <AddTeamModal />
            </AddModalContainer>
        </div>
    );
};
