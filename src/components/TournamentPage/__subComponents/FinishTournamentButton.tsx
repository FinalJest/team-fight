import { Button } from '@mui/material';
import React from 'react';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { finishTournament } from '../../../modules/tournaments/thunk';
import { useTournamentContext } from '../TournamentContext';

const FINISH_TOURNAMENT_TEXT = 'Finish Tournament';

export const FinishTournamentButton: React.FC = () => {
    const dispatch = useReduxDispatch();
    const { id } = useTournamentContext();

    const handleFinishTournament = () => {
        dispatch(finishTournament(id));
    };

    return (
        <Button variant="contained" onClick={handleFinishTournament}>
            {FINISH_TOURNAMENT_TEXT}
        </Button>
    );
};
