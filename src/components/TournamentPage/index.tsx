import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { getTournamentById } from '../../store/selectors';
import { PageContainer } from '../PageContainer';
import { Stats } from './__subComponents/Stats';
import { Matches } from './__subComponents/Matches';
import { TournamentContextProvider } from './TournamentContext';

export const TournamentPage: React.FC = () => {
    const { tournamentId } = useParams();
    const data = useSelector(getTournamentById(tournamentId));

    if (!data || !tournamentId) {
        return null;
    }

    return (
        <TournamentContextProvider id={tournamentId}>
            <PageContainer>
                <Typography variant="h1">
                    {data.name}
                </Typography>
                <Stats data={data} />
                <Matches data={data} />
            </PageContainer>
        </TournamentContextProvider>
    );
};
