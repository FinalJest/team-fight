import React from 'react';
import { Button } from '@mui/material';
import { loadJson } from '../../../services/saveLoadService';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { resetState } from '../../../modules/actions';

export const LoadJSONButton: React.FC = () => {
    const dispatch = useReduxDispatch();
    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            if (loadEvent.target?.result) {
                const newState = loadJson(loadEvent.target.result);
                dispatch(resetState(newState));
            }
        };
        const { files } = event.target;
        if (files) {
            reader.readAsText(files[0]);
        }
    };
    return (
        <Button variant="outlined" component="label">
            Load JSON
            <input
                type="file"
                onChange={handleChangeFile}
                hidden
            />
        </Button>
    );
};
