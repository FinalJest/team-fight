import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ReduxState } from '../../modules';
import { PlayersTable } from '../PlayersTable';
import { StatBlock } from '../StatBlock';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 14px;
`;

const Logo = styled.img`
    width: 150px;
    height: 150px;
`;

export const TeamPage: React.FC = () => {
    const { teamId } = useParams();
    const { data, players } = useSelector((state: ReduxState) => ({
        data: state.teams.find((team) => team.id === teamId),
        players: state.players.filter((player) => player.teamId === teamId),
    }));

    if (!data) {
        return null;
    }

    const statData = [{ name: 'Fame', data: `${data.fame}` }];

    return (
        <Container>
            <Typography variant="h2">
                {data.name}
            </Typography>
            <Logo src={data.logoUrl} alt="logo" />
            <StatBlock data={statData} />
            <Typography variant="h4">
                Roster
            </Typography>
            <PlayersTable players={players} />
        </Container>
    );
};
