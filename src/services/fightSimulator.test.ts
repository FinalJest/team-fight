import { fight, getPlayersPower, resultsToScore } from './fightSimulator';
import { IPlayer } from '../types/IPlayer';

describe('test getPlayersPower', () => {
    test('basic scenario', () => {
        const power = getPlayersPower([{ skill: 20 }, { skill: 30 }] as IPlayer[]);
        expect(power).toBe(50);
    });

    test('no players', () => {
        const power = getPlayersPower([]);
        expect(power).toBe(0);
    });
});

describe('test fight', () => {
    test('basic scenario', () => {
        const team1 = [{ skill: 20 }, { skill: 30 }] as IPlayer[];
        const team2 = [{ skill: 20 }, { skill: 30 }] as IPlayer[];
        expect(fight(team1, team2).length).toBe(1);
    });

    test('multiple fights', () => {
        const team1 = [{ skill: 20 }, { skill: 30 }] as IPlayer[];
        const team2 = [{ skill: 20 }, { skill: 30 }] as IPlayer[];
        expect(fight(team1, team2, 3).length).toBe(3);
        expect(fight(team1, team2, 5).length).toBe(5);
    });

    test('predictability of outcome with 0 power', () => {
        const team1: IPlayer[] = [];
        const team2 = [{ skill: 20 }, { skill: 30 }] as IPlayer[];
        expect(fight(team1, team2)).toEqual([1]);
    });
});

describe('test resultsToScore', () => {
    test('basic scenario', () => {
        const score = resultsToScore([0, 1, 0, 1, 1]);
        expect(score).toEqual([2, 3]);
    });
    test('empty results', () => {
        const score = resultsToScore([]);
        expect(score).toEqual([0, 0]);
    });
});
