import { IRosterIds } from '../types/IRoster';

export const doesTeamHaveFullRoster = (roster: IRosterIds): boolean => [
    roster.top,
    roster.jungle,
    roster.mid,
    roster.carry,
    roster.support,
].filter((player) => player !== undefined).length === 5;
