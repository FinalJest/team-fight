import React from 'react';
import {
    Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { getInput } from '../../services/inputDataService';
import { deleteTeam } from '../../modules/teams/thunk';
import { BaseModalProps } from '../../types/BaseModalProps';
import { useModal } from '../../hooks/useModal';

const DELETE_PLAYERS_CHECKBOX_ID = 'delete_players';
const BUTTON_TEXT = 'Delete Team';

interface DeleteTeamModalProps extends BaseModalProps {
    id: string;
}

export const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({ id, ButtonComponent, onClose }) => {
    const {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    } = useModal(onClose);
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const shouldDeletePlayers = getInput(`#${DELETE_PLAYERS_CHECKBOX_ID}`, formRef)?.checked;
            dispatch(deleteTeam(id, shouldDeletePlayers));
            navigate('/');
        }
    };
    const buttonElement = ButtonComponent
        ? (
            <ButtonComponent onClick={onOpen}>
                {BUTTON_TEXT}
            </ButtonComponent>
        )
        : (
            <Button color="error" variant="contained" onClick={onOpen}>
                {BUTTON_TEXT}
            </Button>
        );
    return (
        <>
            {buttonElement}
            <Dialog open={isOpen} onClose={onModalClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Delete Team
                    </DialogTitle>
                    <DialogContent dividers>
                        <FormControlLabel
                            control={<Checkbox id={DELETE_PLAYERS_CHECKBOX_ID} />}
                            label="Should delete players?"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onModalClose}>Cancel</Button>
                        <Button color="error" type="submit">Delete</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
