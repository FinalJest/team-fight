import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import styled from 'styled-components';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { createTeam } from '../../../modules/teams/thunk';
import { GenerateRosterRadioButtons } from './GenerateRosterRadioButtons';
import { GenerateRosterOption } from '../../../enums/GenerateRosterOption';

const GENERATE_ROSTER_RADIO_NAME = 'generate-roster-group';

const Container = styled.div`
    margin-top: 20px;
`;

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
    const getInputValue = (selector: string): string | undefined =>
        formRef.current?.querySelector<HTMLInputElement>(selector)?.value.trim();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const teamName = getInputValue('#teamName');
            const logoUrl = getInputValue('#logo');
            const shouldGenerateRoster = getInputValue(
                `input[name="${GENERATE_ROSTER_RADIO_NAME}"]:checked`,
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
        <Container>
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
                        <GenerateRosterRadioButtons name={GENERATE_ROSTER_RADIO_NAME} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};
