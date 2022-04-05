import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonsContainer } from '../../ButtonsContainer';
import { Results } from '../../../types/Results';
import { ReduxState } from '../../../modules';
import { getPlayersByTeamId } from '../../../store/selectors';
import { FightButton } from './FightButton';

interface ButtonContainerProps {
    ids: Array<string | undefined>;
    onFight(results: Results): void;
}

export const FightButtons: React.FC<ButtonContainerProps> = ({ ids, onFight }) => {
    const players = useSelector((state: ReduxState) => ids.map((id) => getPlayersByTeamId(id)(state)));

    return (
        <ButtonsContainer>
            <FightButton players={players} count={1} onFight={onFight} />
            <FightButton players={players} count={3} onFight={onFight} />
            <FightButton players={players} count={5} onFight={onFight} />
        </ButtonsContainer>
    );
};
