import React from 'react';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { addTournament } from '../../../modules/tournaments/actions';
import { BasicTournamentModal } from './BasicTournamentModal';
import { BasicTournamentFields } from './BasicTournamentFields';

const BUTTON_TEXT = 'Add Tournament';

export const AddTournament: React.FC<BaseModalProps> = ({ ButtonComponent, onClose }) => {
    const dispatch = useReduxDispatch();
    const handleSubmit = (
        name: string,
        teamCount: number,
        groupsCount: number,
        isForFame: boolean,
        playoffTeamsCount: number,
    ): void => {
        if (name) {
            dispatch(addTournament(name, teamCount, groupsCount, isForFame, playoffTeamsCount));
        }
    };

    return (
        <BasicTournamentModal
            title={BUTTON_TEXT}
            submitText="Add"
            ButtonComponent={ButtonComponent}
            content={<BasicTournamentFields />}
            onSubmit={handleSubmit}
            onClose={onClose}
        />
    );
};
