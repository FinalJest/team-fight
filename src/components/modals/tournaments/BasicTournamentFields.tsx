import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { getInput, getInputValue } from '../../../services/inputDataService';

const TOURNAMENT_NAME_INPUT_ID = 'team_name';
const TEAM_COUNT_INPUT_ID = 'team_count';
const GROUPS_COUNT_ID = 'add_group';
const IS_FOR_FAME_ID = 'is_for_fame_id';
const PLAYOFF_TEAMS_COUNT_ID = 'add_playoff';

const getInputNumber = (id: string, formRef?: React.RefObject<HTMLFormElement>) =>
    parseInt(getInputValue(`#${id}`, formRef) ?? '', 10);

export const getBasicFields = (formRef?: React.RefObject<HTMLFormElement>) => ({
    tournamentName: getInputValue(`#${TOURNAMENT_NAME_INPUT_ID}`, formRef),
    teamCount: getInputNumber(TEAM_COUNT_INPUT_ID),
    groupsCount: getInputNumber(GROUPS_COUNT_ID),
    playoffTeamsCount: getInputNumber(PLAYOFF_TEAMS_COUNT_ID),
    isForFame: Boolean(getInput(`#${IS_FOR_FAME_ID}`, formRef)?.checked),
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
        <TextField
            id={PLAYOFF_TEAMS_COUNT_ID}
            label="Playoff Teams Count"
            defaultValue={0}
            fullWidth
            type="number"
            variant="standard"
            margin="normal"
        />
        <FormControlLabel
            control={<Checkbox id={IS_FOR_FAME_ID} defaultChecked />}
            label="Award Fame"
        />
    </>
);
