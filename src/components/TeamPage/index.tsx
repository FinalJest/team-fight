import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ReduxState } from '../../modules';
import { PlayersTable } from '../PlayersTable';
import { StatBlock } from '../StatBlock';
import { EditTeamModal } from './__subComponents/EditTeamModal';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 14px;
`;

const Logo = styled.img`
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

    const statData = [
        { name: 'Power', data: `${players.reduce((acc, player) => acc + player.skill, 0)}` },
        { name: 'Fame', data: `${data.fame}` },
    ];
    const rowsData = players
        .map((item) => ({ data: item, isDisabled: data.roster.other?.includes(item.id) }))
        .sort((a, b) => Number(a.isDisabled) - Number(b.isDisabled));

    return (
        <Container>
            <Typography variant="h1">
                {data.name}
            </Typography>
            <Logo src={data.logoUrl} alt="logo" />
            <StatBlock data={statData} />
            <Typography variant="h4">
                Roster
            </Typography>
            <PlayersTable rowsData={rowsData} />
            <EditTeamModal {...data} />
        </Container>
    );
};
