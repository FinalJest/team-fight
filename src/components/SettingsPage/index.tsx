import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { PageContainer } from '../PageContainer';
import { SaveJSONButton } from './__subComponents/SaveJSONButton';
import { LoadJSONButton } from './__subComponents/LoadJSONButton';
import { ReduxState } from '../../modules';

export const SettingsPage: React.FC = () => {
    const version = useSelector((state: ReduxState) => state.app.version);
    return (
        <PageContainer>
            <Typography variant="body1">
                {`Version: ${version}`}
            </Typography>
            <SaveJSONButton />
            <LoadJSONButton />
        </PageContainer>
    );
};
