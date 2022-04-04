import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReduxState } from '../../modules';
import { StatBlock } from '../StatBlock';
import { Logo } from '../Logo';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const PlayerPage: React.FC = () => {
    const { playerId } = useParams();
    const { data, teamLogoUrl } = useSelector((state: ReduxState) => {
        const playerData = state.players.find((item) => item.id === playerId);
        const teamLogo = state.teams.find((team) => team.id === playerData?.teamId)?.logoUrl;
        return {
            data: playerData,
            teamLogoUrl: teamLogo,
        };
    });

    if (!data) {
        return null;
    }

    const statData = [
        { name: 'Team', data: <Logo src={teamLogoUrl} /> },
        { name: 'Fame', data: `${data.fame}` },
    ];

    return (
        <Container>
            <Typography variant="h1">{data.name}</Typography>
            <StatBlock data={statData} />
        </Container>
    );
};
