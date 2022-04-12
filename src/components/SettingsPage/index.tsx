import React from 'react';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { SaveJSONButton } from './__subComponents/SaveJSONButton';
import { LoadJSONButton } from './__subComponents/LoadJSONButton';

export const SettingsPage: React.FC = () => (
    <PageContainer>
        <ButtonsContainer>
            <SaveJSONButton />
            <LoadJSONButton />
        </ButtonsContainer>
    </PageContainer>
);
