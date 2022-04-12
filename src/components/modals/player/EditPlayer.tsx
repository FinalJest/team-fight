import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SelectChangeEvent,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { IPlayer } from '../../../types/IPlayer';
import { getInputValue } from '../../../services/inputDataService';
import { Position } from '../../../enums/Position';
import { updatePlayer } from '../../../modules/players/thunk';
import { useModal } from '../../../hooks/useModal';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { BasicPlayerFields } from './BasicPlayerFields';

const PLAYER_NAME_FIELD_ID = 'player_name';
const SKILL_FIELD_ID = 'skill';
const POTENTIAL_FIELD_ID = 'potential';
const MENTAL_FIELD_ID = 'mental';

const BUTTON_TEXT = 'Edit Player';

type EditPlayerModalProps = IPlayer & BaseModalProps;

export const EditPlayer: React.FC<EditPlayerModalProps> = ({
    id,
    skill,
    potential,
    mental,
    name,
    position,
    ButtonComponent,
    onClose,
}) => {
    const {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    } = useModal(onClose);
    const [currentPosition, setCurrentPosition] = React.useState(position);
    const handleChangePosition = (e: SelectChangeEvent): void => {
        setCurrentPosition(e.target.value as Position);
    };
    const dispatch = useReduxDispatch();
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
            onModalClose();
        }
    };
    const buttonElement = ButtonComponent
        ? (
            <ButtonComponent onClick={onOpen}>
                {BUTTON_TEXT}
            </ButtonComponent>
        )
        : (
            <Button variant="contained" onClick={onOpen}>
                {BUTTON_TEXT}
            </Button>
        );
    return (
        <>
            {buttonElement}
            <Dialog open={isOpen} onClose={onModalClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        Edit player
                    </DialogTitle>
                    <DialogContent dividers>
                        <BasicPlayerFields
                            currentPosition={currentPosition}
                            onPositionChange={handleChangePosition}
                            defaultName={name}
                            defaultSkill={skill}
                            defaultPotential={potential}
                            defaultMental={mental}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onModalClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
