import React from 'react';
import {
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,
} from '@mui/material';
import styled from 'styled-components';
import { GenerateRosterOption } from '../../../enums/GenerateRosterOption';

interface GenerateRosterRadioButtonsProps {
    name: string;
}

const Container = styled.div`
    display: inline-flex;
    margin-top: 20px;
`;

export const GenerateRosterRadioButtons: React.FC<GenerateRosterRadioButtonsProps> = ({ name }) => (
    <Container>
        <FormControl>
            <FormLabel id="should-generate-roster-label">Should generate roster</FormLabel>
            <RadioGroup
                aria-labelledby="should-generate-roster-label"
                defaultValue="no"
                name={name}
            >
                <FormControlLabel value={GenerateRosterOption.No} control={<Radio />} label="No" />
                <FormControlLabel
                    value={GenerateRosterOption.Experienced}
                    control={<Radio />}
                    label="Yes, experienced"
                />
                <FormControlLabel
                    value={GenerateRosterOption.Rookies}
                    control={<Radio />}
                    label="Yes, rookies"
                />
            </RadioGroup>
        </FormControl>
    </Container>
);
