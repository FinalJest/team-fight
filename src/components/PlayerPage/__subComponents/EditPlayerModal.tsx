import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { IPlayer } from '../../../types/IPlayer';
import { getInputValue } from '../../../services/inputDataService';
import { Position } from '../../../enums/Position';
import { PositionSelect } from './PositionSelect';
import { updatePlayer } from '../../../modules/players/thunk';

const PLAYER_NAME_FIELD_ID = 'player_name';
const SKILL_FIELD_ID = 'skill';
const POTENTIAL_FIELD_ID = 'potential';
const MENTAL_FIELD_ID = 'mental';

export const EditPlayerModal: React.FC<IPlayer> = ({
    id,
    skill,
    potential,
    mental,
    name,
    position,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentPosition, setCurrentPosition] = React.useState(position);
    const formRef = React.useRef<HTMLFormElement>(null);
    const dispatch = useReduxDispatch();
    const handleClickOpen = (): void => {
        setIsOpen(true);
    };
    const handleClose = (): void => {
        setIsOpen(false);
    };
    const handleChangePosition = (e: SelectChangeEvent): void => {
        setCurrentPosition(e.target.value as Position);
    };
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const newName = getInputValue(`#${PLAYER_NAME_FIELD_ID}`, formRef);
            const newSkill = parseInt(getInputValue(`#${SKILL_FIELD_ID}`, formRef) ?? '', 10);
            const newPotential = parseInt(getInputValue(`#${POTENTIAL_FIELD_ID}`, formRef) ?? '', 10);
            const newMental = parseInt(getInputValue(`#${MENTAL_FIELD_ID}`, formRef) ?? '', 10);
            const isChanged = newName !== name
                || currentPosition !== position
                || newSkill !== skill
                || newPotential !== potential
                || newMental !== mental;
            if (isChanged) {
                dispatch(updatePlayer({
                    id,
                    name: newName,
                    position: currentPosition,
                    skill: newSkill,
                    potential: newPotential,
                    mental: newMental,
                }));
            }
            handleClose();
        }
    };
    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Edit Player
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Edit player
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            id={PLAYER_NAME_FIELD_ID}
                            label="Name"
                            fullWidth
                            variant="standard"
                            defaultValue={name}
                            margin="normal"
                            required
                        />
                        <TextField
                            id={SKILL_FIELD_ID}
                            label="Skill"
                            fullWidth
                            variant="standard"
                            defaultValue={skill}
                            margin="normal"
                            required
                        />
                        <TextField
                            id={POTENTIAL_FIELD_ID}
                            label="Potential"
                            fullWidth
                            variant="standard"
                            defaultValue={potential}
                            margin="normal"
                            required
                        />
                        <TextField
                            id={MENTAL_FIELD_ID}
                            label="Mental"
                            fullWidth
                            variant="standard"
                            defaultValue={mental}
                            margin="normal"
                            required
                        />
                        <PositionSelect currentPosition={currentPosition} onChange={handleChangePosition} />
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
