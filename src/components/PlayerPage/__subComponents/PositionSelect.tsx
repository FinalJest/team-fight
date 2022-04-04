import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { Position } from '../../../enums/Position';

const POSITION_LABEL_ID = 'position_label';

interface PositionSelectProps {
    currentPosition: Position;
    onChange(e: SelectChangeEvent): void;
}

export const PositionSelect: React.FC<PositionSelectProps> = ({ currentPosition, onChange }) => (
    <FormControl
        fullWidth
        margin="normal"
    >
        <InputLabel id={POSITION_LABEL_ID}>Position</InputLabel>
        <Select
            labelId={POSITION_LABEL_ID}
            value={currentPosition}
            label="Position"
            onChange={onChange}
        >
            <MenuItem value={Position.Top}>Top</MenuItem>
            <MenuItem value={Position.Jungle}>Jungle</MenuItem>
            <MenuItem value={Position.Mid}>Mid</MenuItem>
            <MenuItem value={Position.Carry}>Carry</MenuItem>
            <MenuItem value={Position.Support}>Support</MenuItem>
        </Select>
    </FormControl>
);
