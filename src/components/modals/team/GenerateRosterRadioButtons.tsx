import React from 'react';
import {
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,
} from '@mui/material';
import { GeneratePlayerOption } from '../../../enums/GeneratePlayerOption';
import { getInputValue } from '../../../services/inputDataService';

const GENERATE_ROSTER_RADIO_NAME = 'generate_roster_group';

export const getGenerateRosterValue = (
    formRef?: React.RefObject<HTMLFormElement>,
): GeneratePlayerOption => getInputValue(
    `input[name="${GENERATE_ROSTER_RADIO_NAME}"]:checked`,
    formRef,
) as GeneratePlayerOption;

export const GenerateRosterRadioButtons: React.FC = () => (
    <FormControl margin="normal">
        <FormLabel id="should-generate-roster-label">Should generate roster</FormLabel>
        <RadioGroup
            aria-labelledby="should-generate-roster-label"
            defaultValue={GeneratePlayerOption.No}
            name={GENERATE_ROSTER_RADIO_NAME}
        >
            <FormControlLabel value={GeneratePlayerOption.No} control={<Radio />} label="No" />
            <FormControlLabel
                value={GeneratePlayerOption.Experienced}
                control={<Radio />}
                label="Yes, experienced"
            />
            <FormControlLabel
                value={GeneratePlayerOption.Rookie}
                control={<Radio />}
                label="Yes, rookies"
            />
        </RadioGroup>
    </FormControl>
);
