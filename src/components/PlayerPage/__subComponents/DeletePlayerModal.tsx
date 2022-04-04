import React from 'react';
import {
    Button, Dialog, DialogActions, DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { deletePlayer } from '../../../modules/players/thunk';

interface DeletePlayerModalProps {
    id: string;
}

export const DeletePlayerModal: React.FC<DeletePlayerModalProps> = ({ id }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const handleClickOpen = (): void => {
        setIsOpen(true);
    };
    const handleClose = (): void => {
        setIsOpen(false);
    };
    const handleDelete = (): void => {
        dispatch(deletePlayer(id));
        navigate('/');
    };
    return (
        <>
            <Button color="error" variant="contained" onClick={handleClickOpen}>
                Delete Player
            </Button>
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
