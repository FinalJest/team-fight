import {
    getPoints, getWins, generateGroups, getPlaces,
} from './groupService';

describe('test generateGroups', () => {
    test('basic scenario', () => {
        const groups = generateGroups(4, 2);
        expect(groups).toEqual({ A: [undefined, undefined], B: [undefined, undefined] });
    });
    test('uneven teams', () => {
        const groups = generateGroups(10, 4);
        expect(groups).toEqual({
            A: [undefined, undefined, undefined],
            B: [undefined, undefined, undefined],
            C: [undefined, undefined],
            D: [undefined, undefined],
        });
    });
    test('looping naming', () => {
        const groups = generateGroups(30, 30);
        expect(groups.AA).toEqual([undefined]);
    });
    test('more groups than teams', () => {
        const groups = generateGroups(2, 4);
        expect(groups).toEqual({ A: [undefined], B: [undefined] });
    });
});

describe('test getWins', () => {
    test('basic scenario', () => {
        const wins = getWins({ team1: [3, 1], team2: [2, 3] });
        expect(wins).toBe(5);
    });

    test('some undefined', () => {
        const wins = getWins({ team1: [3, 1], team2: undefined });
        expect(wins).toBe(3);
    });

    test('all undefined', () => {
        const wins = getWins({ team1: undefined, team2: undefined });
        expect(wins).toBe(0);
    });
});

describe('test getPoints', () => {
    test('basic scenario', () => {
        const wins = getPoints({ team1: [3, 1], team2: [2, 2], team3: [1, 3] });
        expect(wins).toBe(4);
    });

    test('some undefined', () => {
        const wins = getPoints({ team1: [3, 1], team2: undefined, team3: [1, 3] });
        expect(wins).toBe(3);
    });

    test('all undefined', () => {
        const wins = getPoints({ team1: undefined, team2: undefined, team3: undefined });
        expect(wins).toBe(0);
    });
});

describe('test getPlaces', () => {
    test('basic scenario', () => {
        const places = getPlaces({
            team1: { team1: undefined, team2: [2, 2], team3: [1, 3] },
            team2: { team1: [2, 2], team2: undefined, team3: [1, 1] },
            team3: { team1: [3, 1], team2: [1, 1], team3: undefined },
        });
        expect(places).toEqual({ team1: 3, team2: 2, team3: 1 });
    });
    test('same points scenario', () => {
        const places1 = getPlaces({
            team1: { team1: undefined, team2: [2, 2], team3: [3, 1] },
            team2: { team1: [2, 2], team2: undefined, team3: [3, 1] },
            team3: { team1: [1, 3], team2: [1, 3], team3: undefined },
        });
        expect(places1).toEqual({ team1: 1, team2: 1, team3: 3 });
        const places2 = getPlaces({
            team1: { team1: undefined, team2: [3, 2], team3: [3, 1] },
            team2: { team1: [2, 3], team2: undefined, team3: [1, 1] },
            team3: { team1: [1, 3], team2: [1, 1], team3: undefined },
        });
        expect(places2).toEqual({ team1: 1, team2: 2, team3: 2 });
    });
});
