import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AddTeamModal } from './__subComponents/AddTeamModal';
import { ReduxState } from '../../modules';
import { Team } from './__subComponents/Team';

const Container = styled.div`
    display: flex;
    padding: 12px;
`;

export const TeamsList: React.FC = () => {
    const teams = useSelector((state: ReduxState) => state.teams);
    return (
        <div>
            <Container>
                {teams.map((team) => <Team key={team.id} {...team} />)}
            </Container>
            <AddTeamModal />
        </div>
    );
};
