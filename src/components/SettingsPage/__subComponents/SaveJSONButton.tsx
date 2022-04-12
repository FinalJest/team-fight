import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../modules';
import { saveAsJson } from '../../../services/saveLoadService';

export const SaveJSONButton: React.FC = () => {
    const currentState = useSelector((state: ReduxState) => state);
    const handleSave = (): void => {
        saveAsJson(currentState);
    };
    return (
        <Button onClick={handleSave} variant="contained">
            Save As JSON
        </Button>
    );
};
