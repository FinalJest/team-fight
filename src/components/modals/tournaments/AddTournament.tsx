import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { useModal } from '../../../hooks/useModal';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { BasicTournamentFields, getBasicFields } from './BasicTournamentFields';
import { addTournament } from '../../../modules/tournaments/actions';

const BUTTON_TEXT = 'Add Tournament';

export const AddTournament: React.FC<BaseModalProps> = ({ ButtonComponent, onClose }) => {
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
            const {
                tournamentName, teamCount, groupsCount, isForFame, playoffTeamsCount,
            } = getBasicFields(formRef);
            if (tournamentName) {
                dispatch(addTournament(tournamentName, teamCount, groupsCount, isForFame, playoffTeamsCount));
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
                        Add Tournament
                    </DialogTitle>
                    <DialogContent dividers>
                        <BasicTournamentFields />
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
