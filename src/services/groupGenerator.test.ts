import { generateGroups } from './groupGenerator';

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
