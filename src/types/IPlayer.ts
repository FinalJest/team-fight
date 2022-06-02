import { Position } from '../enums/Position';

interface IPlayerHistoryItem {
    tournamentId: string;
    teamId: string;
    place: number;
}

export interface IPlayer {
    id: string;
    name: string;
    position: Position;
    skill: number;
    potential: number;
    mental: number;
    fame: number;
    isRetired: boolean;
    history: IPlayerHistoryItem[];
    teamId?: string;
}
