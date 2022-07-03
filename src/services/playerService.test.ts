import { getAttractionDifference } from './playerService';
import { IPlayer } from '../types/IPlayer';

const topPlayer = {
    skill: 90, potential: 9, mental: 9, fame: 0,
} as IPlayer;
const midPlayer = {
    skill: 50, potential: 5, mental: 5, fame: 0,
} as IPlayer;
const badPlayer = {
    skill: 10, potential: 1, mental: 1, fame: 0,
} as IPlayer;

describe('test isMoreAttractivePlayer', () => {
    test('should return expected results', () => {
        expect(getAttractionDifference(topPlayer, midPlayer)).toBeGreaterThan(0);
        expect(getAttractionDifference(topPlayer, badPlayer)).toBeGreaterThan(0);
        expect(getAttractionDifference(midPlayer, badPlayer)).toBeGreaterThan(0);

        expect(getAttractionDifference(midPlayer, midPlayer)).toBe(0);
        expect(getAttractionDifference({ ...midPlayer, fame: 10 }, midPlayer)).toBeGreaterThan(0);

        expect(getAttractionDifference(badPlayer, topPlayer)).toBeLessThan(0);
        expect(getAttractionDifference(badPlayer)).toBeGreaterThan(0);

        expect(getAttractionDifference({ ...topPlayer, skill: 89, potential: 10 }, topPlayer)).toBeGreaterThan(0);
        expect(getAttractionDifference({ ...topPlayer, skill: 82, potential: 10 }, topPlayer)).toBeLessThan(0);
        expect(getAttractionDifference({ ...topPlayer, mental: 10 }, topPlayer)).toBeGreaterThan(0);
        expect(getAttractionDifference({ ...topPlayer, skill: 89, mental: 10 }, topPlayer)).toBeLessThan(0);
    });
});
