import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { BasicTeamModal, getBasicFields } from '../../BasicTeamModal';
import { ITeam } from '../../../types/ITeam';
import { editTeam } from '../../../modules/teams/actions';

export const EditTeamModal: React.FC<ITeam> = ({ id, name, logoUrl }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);
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
            const { teamName: newName, logoUrl: newLogoUrl } = getBasicFields(formRef);
            const isChanged = newName !== name
                || newLogoUrl !== logoUrl;
            if (isChanged) {
                dispatch(editTeam({ id, name: newName, logoUrl: newLogoUrl }));
            }
            handleClose();
        }
    };
    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Edit Team
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Edit Team
                    </DialogTitle>
                    <DialogContent dividers>
                        <BasicTeamModal defaultName={name} defaultLink={logoUrl} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
