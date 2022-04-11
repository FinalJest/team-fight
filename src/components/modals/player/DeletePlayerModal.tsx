import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { deletePlayer } from '../../../modules/players/thunk';
import { useModal } from '../../../hooks/useModal';
import { BaseModalProps } from '../../../types/BaseModalProps';

const BUTTON_TEXT = 'Delete Player';

interface DeletePlayerModalProps extends BaseModalProps {
    id: string;
}

export const DeletePlayerModal: React.FC<DeletePlayerModalProps> = ({ id, ButtonComponent, onClose }) => {
    const dispatch = useReduxDispatch();
    const { isOpen, onOpen, onModalClose } = useModal(onClose);
    const handleDelete = (): void => {
        dispatch(deletePlayer(id));
        onModalClose();
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
                <DialogTitle>
                    Delete player?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onModalClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
