import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { deleteTournament } from '../../../modules/tournaments/actions';
import { BasicTournamentModal } from './BasicTournamentModal';
import { Path } from '../../../enums/Path';

const BUTTON_TEXT = 'Delete Tournament';

interface DeleteTournamentModalProps extends BaseModalProps {
    id: string;
}

export const DeleteTournament: React.FC<DeleteTournamentModalProps> = ({ id, ButtonComponent, onClose }) => {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const handleDelete = (): void => {
        dispatch(deleteTournament(id));
        navigate(`/${Path.Tournaments}`);
    };

    return (
        <BasicTournamentModal
            title={BUTTON_TEXT}
            submitText="Delete"
            ButtonComponent={ButtonComponent}
            buttonColor="error"
            onSubmit={handleDelete}
            onClose={onClose}
        />
    );
};
