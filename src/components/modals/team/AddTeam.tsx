import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { createTeam } from '../../../modules/teams/thunk';
import { GenerateRosterRadioButtons, getGenerateRosterValue } from './GenerateRosterRadioButtons';
import { GeneratePlayerOption } from '../../../enums/GeneratePlayerOption';
import { BasicTeamFields, getBasicFields } from './BasicTeamFields';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { useModal } from '../../../hooks/useModal';

const BUTTON_TEXT = 'Add Team';

export const AddTeam: React.FC<BaseModalProps> = ({ ButtonComponent, onClose }) => {
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
            const shouldGenerateRoster = getGenerateRosterValue(formRef);
            if (teamName && logoUrl) {
                dispatch(createTeam(
                    teamName,
                    logoUrl,
                    shouldGenerateRoster !== GeneratePlayerOption.No,
                    shouldGenerateRoster === GeneratePlayerOption.Rookie,
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
                        <BasicTeamFields />
                        <GenerateRosterRadioButtons />
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
