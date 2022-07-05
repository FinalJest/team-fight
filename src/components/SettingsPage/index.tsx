import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { PageContainer } from '../PageContainer';
import { SaveJSONButton } from './__subComponents/SaveJSONButton';
import { LoadJSONButton } from './__subComponents/LoadJSONButton';
import { ReduxState } from '../../modules';
import { ResetLocalStorageButton } from './__subComponents/ResetLocalStorageButton';

export const SettingsPage: React.FC = () => {
    const version = useSelector((state: ReduxState) => state.app.version);
    return (
        <PageContainer title="Settings">
            <Typography variant="body1">
                {`Version: ${version}`}
            </Typography>
            <ResetLocalStorageButton />
            <SaveJSONButton />
            <LoadJSONButton />
        </PageContainer>
    );
};
