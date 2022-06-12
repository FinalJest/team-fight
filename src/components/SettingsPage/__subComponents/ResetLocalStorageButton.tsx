import React from 'react';
import { Button } from '@mui/material';
import { resetLocalStorage } from '../../../services/storageService';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { resetState } from '../../../modules/actions';

export const ResetLocalStorageButton: React.FC = () => {
    const dispatch = useReduxDispatch();
    const handleReset = (): void => {
        resetLocalStorage();
        dispatch(resetState());
    };
    return (
        <Button color="error" onClick={handleReset} variant="contained">
            Reset Local Storage
        </Button>
    );
};
