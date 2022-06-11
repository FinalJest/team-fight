import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { removePlayersFromTeam } from '../../../modules/players/thunk';
import { useModal } from '../../../hooks/useModal';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { ITeam } from '../../../types/ITeam';
import { IPlayer } from '../../../types/IPlayer';

const BUTTON_TEXT = 'Move Player to Free Market';

interface MovePlayerToFreeMarketModalProps extends BaseModalProps {
    id: IPlayer['id'];
    teamId: ITeam['id'];
}

export const MovePlayerToFreeMarket: React.FC<MovePlayerToFreeMarketModalProps> = ({
    id,
    teamId,
    ButtonComponent,
    onClose,
}) => {
    const dispatch = useReduxDispatch();
    const { isOpen, onOpen, onModalClose } = useModal(onClose);
    const handleMoveToFree = () => {
        if (teamId !== undefined) {
            dispatch(removePlayersFromTeam([id]));
        }
        onModalClose();
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
                <DialogTitle>
                    Move player to free market?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onModalClose}>Cancel</Button>
                    <Button onClick={handleMoveToFree} variant="contained">
                        Move to Free Market
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
