import { Button } from '@mui/material';
import React from 'react';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { progressPlayers } from '../../../modules/actions';

const PROGRESS_PLAYERS_TEXT = 'Progress Players';

export const ProgressPlayersButton: React.FC = () => {
    const dispatch = useReduxDispatch();

    const handleProgressPlayers = () => {
        dispatch(progressPlayers());
    };

    return (
        <Button variant="contained" onClick={handleProgressPlayers}>
            {PROGRESS_PLAYERS_TEXT}
        </Button>
    );
};
