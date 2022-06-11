import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonsContainer } from '../../ButtonsContainer';
import { Results } from '../../../types/Results';
import { ReduxState } from '../../../modules';
import { getPlayersByTeamId } from '../../../store/selectors';
import { FightButton } from './FightButton';

const GAME_AMOUNTS_AVAILABLE = [1, 2, 3, 5];

interface ButtonContainerProps {
    ids: Array<string | undefined>;
    onFight(results: Results): void;
}

export const FightButtons: React.FC<ButtonContainerProps> = ({ ids, onFight }) => {
    const players = useSelector((state: ReduxState) => ids.map((id) => getPlayersByTeamId(id)(state)));

    return (
        <ButtonsContainer>
            {GAME_AMOUNTS_AVAILABLE.map((amount) => (
                <FightButton key={amount} players={players} count={amount} onFight={onFight} />
            ))}
        </ButtonsContainer>
    );
};
