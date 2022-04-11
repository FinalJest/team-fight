import { IRosterIds } from './IRoster';

export interface ITeam {
    id: string;
    name: string;
    logoUrl: string;
    fame: number;
    roster: IRosterIds;
}
