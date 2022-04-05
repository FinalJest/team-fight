import React from 'react';
import { Button } from '@mui/material';
import { IPlayer } from '../../../types/IPlayer';
import { fight } from '../../../services/fightSimulator';
import { Results } from '../../../types/Results';

interface FightButtonProps {
    players: IPlayer[][];
    count: number;
    onFight(results: Results): void;
}

export const FightButton: React.FC<FightButtonProps> = ({ players, count, onFight }) => {
    const handleFight = () => {
        onFight(fight(players[0], players[1], count));
    };
    return <Button variant="contained" onClick={handleFight}>{`Bo${count}`}</Button>;
};
