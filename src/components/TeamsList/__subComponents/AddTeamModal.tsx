import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { addTeam } from '../../../modules/teams/actions';

export const AddTeamModal: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);
    const dispatch = useReduxDispatch();
    const handleClickOpen = (): void => {
        setIsOpen(true);
    };
    const handleClose = (): void => {
        setIsOpen(false);
    };
    const getInputValue = (id: string): string | undefined =>
        formRef.current?.querySelector<HTMLInputElement>(`#${id}`)?.value.trim();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const teamName = getInputValue('teamName');
            const logoUrl = getInputValue('logo');
            if (teamName && logoUrl) {
                dispatch(addTeam({ name: teamName, logoUrl }));
                handleClose();
            }
        }
    };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Team
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Add new team
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="teamName"
                            label="Name"
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            id="logo"
                            label="Link to logo"
                            type="url"
                            fullWidth
                            variant="standard"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
