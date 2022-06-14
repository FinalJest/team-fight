import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { useModal } from '../../../hooks/useModal';
import { getBasicFields } from './BasicTournamentFields';

interface BasicTournamentModalProps extends BaseModalProps {
    title: string;
    submitText: string;
    buttonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    onSubmit(
        name: string,
        teamCount: number,
        groupsCount: number,
        isForFame: boolean,
        playoffTeamsCount: number,
    ): void,
}

export const BasicTournamentModal: React.FC<BasicTournamentModalProps> = ({
    title,
    submitText,
    ButtonComponent,
    content,
    buttonColor,
    onClose,
    onSubmit,
}) => {
    const {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    } = useModal(onClose);
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (formRef.current) {
            const {
                tournamentName, teamCount, groupsCount, isForFame, playoffTeamsCount,
            } = getBasicFields(formRef);
            onSubmit(
                tournamentName,
                teamCount,
                groupsCount,
                isForFame,
                playoffTeamsCount,
            );
        }
        onModalClose();
    };
    const buttonElement = ButtonComponent
        ? (
            <ButtonComponent onClick={onOpen}>
                {title}
            </ButtonComponent>
        )
        : (
            <Button variant="contained" color={buttonColor} onClick={onOpen}>
                {title}
            </Button>
        );

    return (
        <>
            {buttonElement}
            <Dialog open={isOpen} onClose={onModalClose}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    {content && (
                        <DialogContent dividers>
                            {content}
                        </DialogContent>
                    )}
                    <DialogActions>
                        <Button onClick={onModalClose}>Cancel</Button>
                        <Button color={buttonColor} type="submit">{submitText}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
