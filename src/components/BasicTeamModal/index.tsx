import React from 'react';
import { TextField } from '@mui/material';
import { getInputValue } from '../../services/inputDataService';

const TEAM_NAME_INPUT_ID = 'team_name';
const LOGO_INPUT_ID = 'logo';

export const getBasicFields = (formRef?: React.RefObject<HTMLFormElement>) => ({
    teamName: getInputValue(`#${TEAM_NAME_INPUT_ID}`, formRef),
    logoUrl: getInputValue(`#${LOGO_INPUT_ID}`, formRef),
});

interface BasicTeamModalProps {
    defaultName?: string;
    defaultLink?: string;
}

export const BasicTeamModal: React.FC<BasicTeamModalProps> = ({ defaultLink, defaultName }) => (
    <>
        <TextField
            id={TEAM_NAME_INPUT_ID}
            label="Name"
            defaultValue={defaultName}
            fullWidth
            variant="standard"
            margin="normal"
            required
        />
        <TextField
            id={LOGO_INPUT_ID}
            label="Link to logo"
            defaultValue={defaultLink}
            type="url"
            fullWidth
            variant="standard"
            margin="normal"
            required
        />
    </>
);
