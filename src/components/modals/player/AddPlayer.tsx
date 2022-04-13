import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SelectChangeEvent,
} from '@mui/material';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { useModal } from '../../../hooks/useModal';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { BasicPlayerFields, getBasicFields } from './BasicPlayerFields';
import { GeneratePosition } from '../../../enums/Position';
import { NO_TEAM_VALUE } from '../../TeamSelect';
import { generatePlayerFromTemplate } from '../../../services/playerGenerator';
import { getGeneratePlayerValue } from './GeneratePlayerRadioButtons';
import { GeneratePlayerOption } from '../../../enums/GeneratePlayerOption';
import { addPlayers } from '../../../modules/players/thunk';

const BUTTON_TEXT = 'Add Player';

export const AddPlayer: React.FC<BaseModalProps> = ({ ButtonComponent, onClose }) => {
    const {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    } = useModal(onClose);
    const [currentPosition, setCurrentPosition] = React.useState<GeneratePosition | undefined>(undefined);
    const [currentTeam, setCurrentTeam] = React.useState<string>(NO_TEAM_VALUE);
    const handleChangePosition = (e: SelectChangeEvent): void => {
        setCurrentPosition(e.target.value as GeneratePosition);
    };
    const handleChangeTeam = (id: string): void => {
        setCurrentTeam(id);
    };
    const dispatch = useReduxDispatch();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const {
                playerName,
                potential,
                skill,
                mental,
            } = getBasicFields();
            const generatePlayerOption = getGeneratePlayerValue();
            generatePlayerFromTemplate({
                name: playerName,
                skill,
                potential,
                mental,
                position: currentPosition === 'random' ? undefined : currentPosition,
                teamId: currentTeam !== NO_TEAM_VALUE ? currentTeam : undefined,
            }, generatePlayerOption === GeneratePlayerOption.Rookie).then((player) => {
                dispatch(addPlayers([player]));
                onModalClose();
            });
        }
    };
    const buttonElement = ButtonComponent
        ? (
            <ButtonComponent onClick={onOpen}>
                {BUTTON_TEXT}
            </ButtonComponent>
        )
        : (
            <Button variant="contained" onClick={onOpen}>
                {BUTTON_TEXT}
            </Button>
        );
    return (
        <>
            {buttonElement}
            <Dialog open={isOpen} onClose={onModalClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Add New Team
                    </DialogTitle>
                    <DialogContent dividers>
                        <BasicPlayerFields
                            currentTeam={currentTeam}
                            currentPosition={currentPosition}
                            onTeamChange={handleChangeTeam}
                            onPositionChange={handleChangePosition}
                            allowGenerateStats
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onModalClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
