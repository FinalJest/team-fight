import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ReduxState } from '../../modules';
import { PlayersTable } from '../PlayersTable';
import { StatBlock } from '../StatBlock';
import { EditTeamModal } from './__subComponents/EditTeamModal';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { DeleteTeamModal } from './__subComponents/DeleteTeamModal';
import { getMainRosterPlayers, getTeamById } from '../../store/selectors';
import { getPlayersPower } from '../../services/fightSimulator';

const Logo = styled.img`
    height: 150px;
`;

export const TeamPage: React.FC = () => {
    const { teamId } = useParams();
    const { data, players, power } = useSelector((state: ReduxState) => ({
        data: getTeamById(teamId)(state),
        players: state.players.filter((player) => player.teamId === teamId),
        power: getPlayersPower(getMainRosterPlayers(teamId)(state)),
    }));

    if (!data) {
        return null;
    }

    const statData = [
        { name: 'Power', data: `${power}` },
        { name: 'Fame', data: `${data.fame}` },
    ];
    const rowsData = players
        .map((item) => ({ data: item, isSub: data.roster.other?.includes(item.id) }))
        .sort((a, b) => Number(a.isSub) - Number(b.isSub));

    return (
        <PageContainer>
            <Typography variant="h1">
                {data.name}
            </Typography>
            <Logo src={data.logoUrl} alt="logo" />
            <StatBlock data={statData} />
            <Typography variant="h4">
                Roster
            </Typography>
            <PlayersTable rowsData={rowsData} />
            <ButtonsContainer>
                <EditTeamModal {...data} />
                <DeleteTeamModal id={data.id} />
            </ButtonsContainer>
        </PageContainer>
    );
};
