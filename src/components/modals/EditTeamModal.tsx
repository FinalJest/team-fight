import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { BasicTeamModalFields, getBasicFields } from './BasicTeamModalFields';
import { ITeam } from '../../types/ITeam';
import { editTeam } from '../../modules/teams/actions';
import { BaseModalProps } from '../../types/BaseModalProps';
import { useModal } from '../../hooks/useModal';

const BUTTON_TEXT = 'Edit Team';

type EditTeamModalProps = BaseModalProps & ITeam;

export const EditTeamModal: React.FC<EditTeamModalProps> = ({
    id,
    name,
    logoUrl,
    ButtonComponent,
    onClose,
}) => {
    const {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    } = useModal(onClose);
    const dispatch = useReduxDispatch();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const { teamName: newName, logoUrl: newLogoUrl } = getBasicFields(formRef);
            const isChanged = newName !== name
                || newLogoUrl !== logoUrl;
            if (isChanged) {
                dispatch(editTeam({ id, name: newName, logoUrl: newLogoUrl }));
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
                        Edit Team
                    </DialogTitle>
                    <DialogContent dividers>
                        <BasicTeamModalFields defaultName={name} defaultLink={logoUrl} />
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
