import React from 'react';
import { TextField } from '@mui/material';
import { getInputValue } from '../../../services/inputDataService';

const SKILL_FIELD_ID = 'skill';
const POTENTIAL_FIELD_ID = 'potential';
const MENTAL_FIELD_ID = 'mental';

export const getBasicStatsFields = (formRef?: React.RefObject<HTMLFormElement>) => {
    const skillValue = getInputValue(`#${SKILL_FIELD_ID}`, formRef);
    const potentialValue = getInputValue(`#${POTENTIAL_FIELD_ID}`, formRef);
    const mentalValue = getInputValue(`#${MENTAL_FIELD_ID}`, formRef);
    return {
        skill: skillValue === undefined ? skillValue : parseInt(skillValue, 10),
        potential: potentialValue === undefined ? potentialValue : parseInt(potentialValue, 10),
        mental: mentalValue === undefined ? mentalValue : parseInt(mentalValue, 10),
    };
};

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
