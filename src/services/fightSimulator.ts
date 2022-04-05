import { IPlayer } from '../types/IPlayer';
import { getRandomInt } from './randomGenerator';
import { Results } from '../types/Results';

const MORAL_BOOST = 20;

const getMoralBoosts = ([mental1, mental2]: number[]): [number, number] => {
    const sum = mental1 + mental2;
    const totalMental = sum + Math.floor(sum / 2);
    const mentalRoll = getRandomInt(totalMental);

    switch (true) {
        case mentalRoll < mental1:
            return [MORAL_BOOST, 0];
        case mentalRoll < sum:
            return [0, MORAL_BOOST];
        default:
            return [0, 0];
    }
};
const getPlayersMental = (players: IPlayer[]): number => players.reduce((acc, player) => acc + player.mental, 0);

const fightOnce = ([power1, power2]: number[]): 0 | 1 => {
    const sum = power1 + power2;
    const fightRoll = getRandomInt(sum);
    return fightRoll < power1 ? 0 : 1;
};

export const getPlayersPower = (players: IPlayer[]): number => players.reduce((acc, player) => acc + player.skill, 0);

export const fight = (players1: IPlayer[], players2: IPlayer[], times: number = 1): Results => {
    const results: Results = [];
    const playersArr = [players1, players2];
    const powers = playersArr.map(getPlayersPower);
    const mentals = playersArr.map(getPlayersMental);

    for (let i = 0; i < times; i++) {
        const boost = getMoralBoosts(mentals);
        boost.forEach((additionalSkill, index) => {
            powers[index] += additionalSkill;
        });
        results.push(fightOnce(powers));
    }

    return results;
};
