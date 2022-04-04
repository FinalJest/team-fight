import React from 'react';
import {
    Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { getInput } from '../../../services/inputDataService';
import { deleteTeam } from '../../../modules/teams/thunk';

const DELETE_PLAYERS_CHECKBOX_ID = 'delete_players';

interface DeleteTeamModalProps {
    id: string;
}

export const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({ id }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const handleClickOpen = (): void => {
        setIsOpen(true);
    };
    const handleClose = (): void => {
        setIsOpen(false);
    };
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const shouldDeletePlayers = getInput(`#${DELETE_PLAYERS_CHECKBOX_ID}`, formRef)?.checked;
            dispatch(deleteTeam(id, shouldDeletePlayers));
            navigate('/');
        }
    };
    return (
        <>
            <Button color="error" variant="contained" onClick={handleClickOpen}>
                Delete Team
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="error" type="submit">Delete</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
