import { IRosterIds } from './IRoster';

interface ITeamHistoryItem {
    tournamentId: string;
    place: number;
}

export interface ITeam {
    id: string;
    name: string;
    logoUrl: string;
    fame: number;
    roster: IRosterIds;
    history: ITeamHistoryItem[];
}
