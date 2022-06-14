import React from 'react';
import { useSelector } from 'react-redux';
import { BaseModalProps } from '../../../types/BaseModalProps';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { editTournament } from '../../../modules/tournaments/actions';
import { ITournament } from '../../../types/ITournament';
import { BasicTournamentModal } from './BasicTournamentModal';
import { BasicTournamentFields } from './BasicTournamentFields';
import { getTournamentById } from '../../../store/selectors';
import { getGroupsTeamCount } from '../../../services/groupService';
import { getPlayoffTeamsCount } from '../../../services/playoffService';

const BUTTON_TEXT = 'Edit Tournament';

interface EditTournamentProps extends BaseModalProps {
    id: ITournament['id'];
}

export const EditTournament: React.FC<EditTournamentProps> = ({ id, ButtonComponent, onClose }) => {
    const tournamentData = useSelector(getTournamentById(id));
    const dispatch = useReduxDispatch();
    const handleSubmit = (
        name: string,
        teamCount: number,
        groupsCount: number,
        isForFame: boolean,
        playoffTeamsCount: number,
    ): void => {
        if (name) {
            dispatch(editTournament(id, name, teamCount, groupsCount, isForFame, playoffTeamsCount));
        }
    };

    return (
        <BasicTournamentModal
            title={BUTTON_TEXT}
            submitText="Edit"
            ButtonComponent={ButtonComponent}
            content={(
                <BasicTournamentFields
                    defaultName={tournamentData?.name}
                    defaultTeamCount={tournamentData?.teamCount}
                    defaultGroupCount={getGroupsTeamCount(tournamentData?.group)}
                    defaultPlayoffTeamsCount={getPlayoffTeamsCount(tournamentData?.playoff)}
                    defaultAwardFame={tournamentData?.isForFame}
                />
            )}
            onSubmit={handleSubmit}
            onClose={onClose}
        />
    );
};
