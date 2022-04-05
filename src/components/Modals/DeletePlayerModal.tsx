import React from 'react';
import {
    Button, Dialog, DialogActions, DialogTitle, ExtendButtonBase,
} from '@mui/material';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { deletePlayer } from '../../modules/players/thunk';

const BUTTON_TEXT = 'Delete Player';

interface DeletePlayerModalProps {
    id: string;
    ButtonComponent?: ExtendButtonBase<any>;
    onClose?(): void;
}

export const DeletePlayerModal: React.FC<DeletePlayerModalProps> = ({ id, ButtonComponent, onClose }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useReduxDispatch();
    const handleClickOpen = (): void => {
        setIsOpen(true);
    };
    const handleClose = (): void => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };
    const handleDelete = (): void => {
        dispatch(deletePlayer(id));
        handleClose();
    };
    const buttonElement = ButtonComponent
        ? (
            <ButtonComponent onClick={handleClickOpen}>
                {BUTTON_TEXT}
            </ButtonComponent>
        )
        : (
            <Button color="error" variant="contained" onClick={handleClickOpen}>
                {BUTTON_TEXT}
            </Button>
        );
    return (
        <>
            {buttonElement}
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>
                    Delete player?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
