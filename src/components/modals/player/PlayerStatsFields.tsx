import React from 'react';
import { TextField } from '@mui/material';
import { getInputValue } from '../../../services/inputDataService';

const SKILL_FIELD_ID = 'skill';
const POTENTIAL_FIELD_ID = 'potential';
const MENTAL_FIELD_ID = 'mental';

export const getBasicStatsFields = (formRef?: React.RefObject<HTMLFormElement>) => ({
    skill: getInputValue(`#${SKILL_FIELD_ID}`, formRef),
    potential: getInputValue(`#${POTENTIAL_FIELD_ID}`, formRef),
    mental: getInputValue(`#${MENTAL_FIELD_ID}`, formRef),
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
            variant="standard"
            defaultValue={defaultSkill}
            margin="normal"
        />
        <TextField
            id={POTENTIAL_FIELD_ID}
            label="Potential"
            fullWidth
            variant="standard"
            defaultValue={defaultPotential}
            margin="normal"
        />
        <TextField
            id={MENTAL_FIELD_ID}
            label="Mental"
            fullWidth
            variant="standard"
            defaultValue={defaultMental}
            margin="normal"
        />
    </>
);
