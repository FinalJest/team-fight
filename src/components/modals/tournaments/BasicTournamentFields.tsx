import React from 'react';
import { TextField } from '@mui/material';
import { getInputValue } from '../../../services/inputDataService';

const TOURNAMENT_NAME_INPUT_ID = 'team_name';
const TEAM_COUNT_INPUT_ID = 'team_count';
const GROUPS_COUNT_ID = 'add_group';

export const getBasicFields = (formRef?: React.RefObject<HTMLFormElement>) => ({
    tournamentName: getInputValue(`#${TOURNAMENT_NAME_INPUT_ID}`, formRef),
    teamCount: parseInt(getInputValue(`#${TEAM_COUNT_INPUT_ID}`, formRef) ?? '', 10),
    groupsCount: parseInt(getInputValue(`#${GROUPS_COUNT_ID}`, formRef) ?? '', 10),
});

interface BasicTournamentModalProps {
    defaultName?: string;
}

export const BasicTournamentFields: React.FC<BasicTournamentModalProps> = ({ defaultName }) => (
    <>
        <TextField
            id={TOURNAMENT_NAME_INPUT_ID}
            label="Tournament Name"
            defaultValue={defaultName}
            fullWidth
            variant="standard"
            margin="normal"
            required
        />
        <TextField
            id={TEAM_COUNT_INPUT_ID}
            label="Team Count"
            defaultValue={8}
            fullWidth
            type="number"
            variant="standard"
            margin="normal"
            required
        />
        <TextField
            id={GROUPS_COUNT_ID}
            label="Groups Count"
            defaultValue={0}
            fullWidth
            type="number"
            variant="standard"
            margin="normal"
        />
    </>
);
