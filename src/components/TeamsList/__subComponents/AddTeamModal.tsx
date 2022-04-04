import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { createTeam } from '../../../modules/teams/thunk';
import { GenerateRosterRadioButtons } from './GenerateRosterRadioButtons';
import { GenerateRosterOption } from '../../../enums/GenerateRosterOption';
import { getInputValue } from '../../../services/inputDataService';

const TEAM_NAME_INPUT_ID = 'team_name';
const LOGO_INPUT_ID = 'logo';
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
            const teamName = getInputValue(`#${TEAM_NAME_INPUT_ID}`, formRef);
            const logoUrl = getInputValue(`#${LOGO_INPUT_ID}`, formRef);
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
                        Add new team
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            id={TEAM_NAME_INPUT_ID}
                            label="Name"
                            fullWidth
                            variant="standard"
                            margin="normal"
                            required
                        />
                        <TextField
                            id={LOGO_INPUT_ID}
                            label="Link to logo"
                            type="url"
                            fullWidth
                            variant="standard"
                            margin="normal"
                            required
                        />
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
