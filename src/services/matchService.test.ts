import { getMatchId, isTournamentFightType, parseMatchId } from './matchService';
import { TournamentFightType } from '../types/TournamentFightType';

describe('test isTournamentFightType', () => {
    test('basic scenario', () => {
        const result = isTournamentFightType(TournamentFightType.Group);
        expect(result).toBe(true);
    });
    test('false scenario', () => {
        const result = isTournamentFightType('else');
        expect(result).toBe(false);
    });
});

describe('test getMatchId', () => {
    test('basic scenario', () => {
        const matchId = getMatchId(TournamentFightType.Group, 'test1', 'test2');
        expect(matchId).toBe('group+test1+test2');
    });
});

describe('test parseMatchId', () => {
    test('basic scenario', () => {
        const parsedId = parseMatchId('group+test1+test2');
        expect(parsedId).toEqual([TournamentFightType.Group, 'test1', 'test2']);
    });
    test('invalid tournament type', () => {
        const parsedId = parseMatchId('else+test+test2');
        expect(parsedId).toBe(null);
    });
});
