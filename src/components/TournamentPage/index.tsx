import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { getTournamentById } from '../../store/selectors';
import { PageContainer } from '../PageContainer';
import { Stats } from './__subComponents/Stats';
import { Matches } from './__subComponents/Matches';
import { TournamentContextProvider } from './TournamentContext';
import { ButtonsContainer } from '../ButtonsContainer';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { finishTournament } from '../../modules/tournaments/thunk';

const FINISH_TOURNAMENT_TEXT = 'Finish Tournament';

export const TournamentPage: React.FC = () => {
    const { tournamentId } = useParams();
    const data = useSelector(getTournamentById(tournamentId));
    const dispatch = useReduxDispatch();

    if (!data || !tournamentId) {
        return null;
    }

    const onFinishTournament = () => {
        dispatch(finishTournament(tournamentId));
    };

    return (
        <TournamentContextProvider id={tournamentId} isFinished={data.isFinished}>
            <PageContainer>
                <Typography variant="h1">
                    {data.name}
                </Typography>
                <Stats data={data} />
                <Matches data={data} />
                <ButtonsContainer>
                    {!data.isFinished && (
                        <Button variant="contained" onClick={onFinishTournament}>
                            {FINISH_TOURNAMENT_TEXT}
                        </Button>
                    )}
                </ButtonsContainer>
            </PageContainer>
        </TournamentContextProvider>
    );
};
