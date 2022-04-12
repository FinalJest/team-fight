import React from 'react';
import { TextField } from '@mui/material';
import { getInputValue } from '../../../services/inputDataService';

const SKILL_FIELD_ID = 'skill';
const POTENTIAL_FIELD_ID = 'potential';
const MENTAL_FIELD_ID = 'mental';

export const getBasicStatsFields = (formRef?: React.RefObject<HTMLFormElement>) => ({
    skill: parseInt(getInputValue(`#${SKILL_FIELD_ID}`, formRef) ?? '', 10),
    potential: parseInt(getInputValue(`#${POTENTIAL_FIELD_ID}`, formRef) ?? '', 10),
    mental: parseInt(getInputValue(`#${MENTAL_FIELD_ID}`, formRef) ?? '', 10),
});

interface PlayerStatsFieldsProps {
    defaultSkill?: number;
    defaultPotential?: number;
    defaultMental?: number;
}

export const PlayerStatsFields: React.FC<PlayerStatsFieldsProps> = ({
    defaultMental,
    defaultPotential,
    defaultSkill,
}) => (
    <>
        <TextField
            id={SKILL_FIELD_ID}
            label="Skill"
            fullWidth
            type="number"
            variant="standard"
            defaultValue={defaultSkill}
            margin="normal"
        />
        <TextField
            id={POTENTIAL_FIELD_ID}
            label="Potential"
            fullWidth
            type="number"
            variant="standard"
            defaultValue={defaultPotential}
            margin="normal"
        />
        <TextField
            id={MENTAL_FIELD_ID}
            label="Mental"
            fullWidth
            type="number"
            variant="standard"
            defaultValue={defaultMental}
            margin="normal"
        />
    </>
);
