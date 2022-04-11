import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { GeneratePlayerOption } from '../../../enums/GeneratePlayerOption';
import { getInputValue } from '../../../services/inputDataService';

const GENERATE_PLAYER_RADIO_NAME = 'generate_roster_group';

export const getGeneratePlayerValue = (
    formRef?: React.RefObject<HTMLFormElement>,
): GeneratePlayerOption => getInputValue(
    `input[name="${GENERATE_PLAYER_RADIO_NAME}"]:checked`,
    formRef,
) as GeneratePlayerOption;

interface GeneratePlayerRadioButtonsProps {
    onChange?(event: React.ChangeEvent<HTMLInputElement>, value: string): void;
}

export const GeneratePlayerRadioButtons: React.FC<GeneratePlayerRadioButtonsProps> = ({ onChange }) => (
    <FormControl margin="normal">
        <FormLabel id="should-generate-roster-label">Should generate stats</FormLabel>
        <RadioGroup
            aria-labelledby="should-generate-roster-label"
            defaultValue={GeneratePlayerOption.No}
            name={GENERATE_PLAYER_RADIO_NAME}
            onChange={onChange}
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
                label="Yes, rookie"
            />
        </RadioGroup>
    </FormControl>
);
