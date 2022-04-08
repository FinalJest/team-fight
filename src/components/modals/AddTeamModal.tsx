import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { createTeam } from '../../modules/teams/thunk';
import { GenerateRosterRadioButtons } from '../TeamsList/__subComponents/GenerateRosterRadioButtons';
import { GenerateRosterOption } from '../../enums/GenerateRosterOption';
import { getInputValue } from '../../services/inputDataService';
import { BasicTeamModalFields, getBasicFields } from './BasicTeamModalFields';
import { BaseModalProps } from '../../types/BaseModalProps';
import { useModal } from '../../hooks/useModal';

const GENERATE_ROSTER_RADIO_NAME = 'generate_roster_group';
const BUTTON_TEXT = 'Add Team';

export const AddTeamModal: React.FC<BaseModalProps> = ({ ButtonComponent, onClose }) => {
    const {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    } = useModal(onClose);
    const dispatch = useReduxDispatch();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const { teamName, logoUrl } = getBasicFields(formRef);
            const shouldGenerateRoster = getInputValue(
                `input[name="${GENERATE_ROSTER_RADIO_NAME}"]:checked`,
                formRef,
            ) as GenerateRosterOption;
            if (teamName && logoUrl) {
                dispatch(createTeam(
                    teamName,
                    logoUrl,
                    shouldGenerateRoster !== GenerateRosterOption.No,
                    shouldGenerateRoster === GenerateRosterOption.Rookies,
                ));
                onModalClose();
            }
        } else {
            onModalClose();
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
                        <BasicTeamModalFields />
                        <GenerateRosterRadioButtons name={GENERATE_ROSTER_RADIO_NAME} />
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
