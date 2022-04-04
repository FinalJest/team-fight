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
import { GenerateRosterRadioButtons } from './GenerateRosterRadioButtons';
import { GenerateRosterOption } from '../../../enums/GenerateRosterOption';
import { getInputValue } from '../../../services/inputDataService';
import { BasicTeamModal, getBasicFields } from '../../BasicTeamModal';

const GENERATE_ROSTER_RADIO_NAME = 'generate_roster_group';

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
                handleClose();
            }
        }
    };
    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Team
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Add New Team
                    </DialogTitle>
                    <DialogContent dividers>
                        <BasicTeamModal />
                        <GenerateRosterRadioButtons name={GENERATE_ROSTER_RADIO_NAME} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
