import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ReduxState } from '../../modules';
import { PlayersTable } from '../PlayersTable';
import { StatBlock } from '../StatBlock';
import { EditTeam } from '../modals/team/EditTeam';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { DeleteTeam } from '../modals/team/DeleteTeam';
import { getTeamById, getTeamPower } from '../../store/selectors';
import { Position } from '../../enums/Position';
import { TeamHistory } from './__subComponents/TeamHistory';

const Logo = styled.img`
    height: 150px;
`;

const POSITION_ORDER = [Position.Top, Position.Jungle, Position.Mid, Position.Carry, Position.Support];

export const TeamPage: React.FC = () => {
    const { teamId } = useParams();
    const { data, players, power } = useSelector((state: ReduxState) => ({
        data: getTeamById(teamId)(state),
        players: state.players.filter((player) => player.teamId === teamId),
        power: getTeamPower(state, teamId),
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
        .sort((a, b) => {
            const subDiff = Number(a.isSub) - Number(b.isSub);
            if (subDiff) {
                return subDiff;
            }
            return POSITION_ORDER.indexOf(a.data.position) - POSITION_ORDER.indexOf(b.data.position);
        });

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
            <TeamHistory data={data.history} />
            <ButtonsContainer>
                <EditTeam {...data} />
                <DeleteTeam id={data.id} />
            </ButtonsContainer>
        </PageContainer>
    );
};
