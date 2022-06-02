import React from 'react';
import { PageContainer } from '../PageContainer';
import { SaveJSONButton } from './__subComponents/SaveJSONButton';
import { LoadJSONButton } from './__subComponents/LoadJSONButton';

export const SettingsPage: React.FC = () => (
    <PageContainer>
        <SaveJSONButton />
        <LoadJSONButton />
    </PageContainer>
);
