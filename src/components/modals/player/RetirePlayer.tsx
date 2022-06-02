import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { retirePlayers } from '../../../modules/players/thunk';
import { useModal } from '../../../hooks/useModal';
import { BaseModalProps } from '../../../types/BaseModalProps';

const BUTTON_TEXT = 'Retire Player';

interface RetirePlayerModalProps extends BaseModalProps {
    id: string;
}

export const RetirePlayer: React.FC<RetirePlayerModalProps> = ({ id, ButtonComponent, onClose }) => {
    const dispatch = useReduxDispatch();
    const { isOpen, onOpen, onModalClose } = useModal(onClose);
    const handleRetire = (): void => {
        dispatch(retirePlayers(id));
        onModalClose();
    };
    const buttonElement = ButtonComponent
        ? (
            <ButtonComponent onClick={onOpen}>
                {BUTTON_TEXT}
            </ButtonComponent>
        )
        : (
            <Button color="warning" variant="contained" onClick={onOpen}>
                {BUTTON_TEXT}
            </Button>
        );
    return (
        <>
            {buttonElement}
            <Dialog open={isOpen} onClose={onModalClose}>
                <DialogTitle>
                    Retire player?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onModalClose}>Cancel</Button>
                    <Button onClick={handleRetire} color="warning" variant="contained">
                        Retire
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
