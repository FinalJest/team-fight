import { IPlayer } from '../types/IPlayer';
import { isStronger } from './comparisonService';

export const getStrongestPlayer = (players: IPlayer[]): IPlayer | undefined => {
    let strongestPlayer: IPlayer | undefined;

    players.reduce((max, player) => {
        if (isStronger(max, [player.skill, player.mental])) {
            strongestPlayer = player;
            return [player.skill, player.mental];
        }
        return max;
    }, [-1, -1]);

    return strongestPlayer;
};
