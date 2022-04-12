import React from 'react';
import { SelectChangeEvent, TextField } from '@mui/material';
import { PositionSelect } from '../../PositionSelect';
import { GeneratePosition } from '../../../enums/Position';
import { getInputValue } from '../../../services/inputDataService';
import { getBasicStatsFields, PlayerStatsFields } from './PlayerStatsFields';
import { GeneratePlayerOption } from '../../../enums/GeneratePlayerOption';
import { GeneratePlayerRadioButtons } from './GeneratePlayerRadioButtons';

const PLAYER_NAME_FIELD_ID = 'player_name';

export const getBasicFields = (formRef?: React.RefObject<HTMLFormElement>) => ({
    playerName: getInputValue(`#${PLAYER_NAME_FIELD_ID}`, formRef),
    ...getBasicStatsFields(formRef),
});

interface BasicPlayerModalFieldsProps {
    currentPosition?: GeneratePosition;
    defaultName?: string;
    defaultSkill?: number;
    defaultPotential?: number;
    defaultMental?: number;
    allowGenerateStats?: boolean;
    onPositionChange(e: SelectChangeEvent): void;
}

export const BasicPlayerFields: React.FC<BasicPlayerModalFieldsProps> = ({
    currentPosition,
    defaultName,
    defaultSkill,
    defaultPotential,
    defaultMental,
    allowGenerateStats,
    onPositionChange,
}) => {
    const [shouldShowStatFields, setShouldShowStatFields] = React.useState(true);
    const handleGenerateOptionChange = (event: React.ChangeEvent<HTMLInputElement>, value: string): void => {
        setShouldShowStatFields(value === GeneratePlayerOption.No);
    };
    return (
        <>
            <TextField
                id={PLAYER_NAME_FIELD_ID}
                label="Name"
                fullWidth
                variant="standard"
                defaultValue={defaultName}
                margin="normal"
            />
            {allowGenerateStats && (
                <GeneratePlayerRadioButtons onChange={handleGenerateOptionChange} />
            )}
            {shouldShowStatFields && (
                <PlayerStatsFields
                    defaultSkill={defaultSkill}
                    defaultPotential={defaultPotential}
                    defaultMental={defaultMental}
                />
            )}
            <PositionSelect currentPosition={currentPosition} onChange={onPositionChange} />
        </>
    );
};
