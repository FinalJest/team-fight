import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { ReduxState } from '../../modules';
import {
    getPlayerById, getTeamById, getTournamentById,
} from '../../store/selectors';
import { PageContainer } from '../PageContainer';
import { StatBlock } from '../StatBlock';
import { Logo } from '../Logo';
import { ComponentSize } from '../../enums/ComponentSize';

export const TournamentPage: React.FC = () => {
    const { tournamentId } = useParams();
    const { data, mvp, winner } = useSelector((state: ReduxState) => {
        const stateTournament = getTournamentById(tournamentId)(state);
        return {
            data: stateTournament,
            winner: getTeamById(stateTournament?.winnerId)(state),
            mvp: getPlayerById(stateTournament?.mvpId)(state),
        };
    });

    if (!data) {
        return null;
    }

    const statData = [
        {
            name: 'Team Count',
            data: `${data.teamCount}`,
        },
        {
            name: 'Winner',
            data: winner ? (
                <Link to={`/teams/${winner.id}`}>
                    <Logo size={ComponentSize.S} src={winner.logoUrl} />
                </Link>
            ) : '-',
        },
        {
            name: 'MVP',
            data: mvp ? (
                <Link to={`/players/${mvp.id}`}>
                    {mvp.name}
                </Link>
            ) : '-',
        },
    ];

    return (
        <PageContainer>
            <Typography variant="h1">
                {data.name}
            </Typography>
            <StatBlock data={statData} />
        </PageContainer>
    );
};
