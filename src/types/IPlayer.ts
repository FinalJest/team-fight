import { Position } from '../enums/Position';

export interface IPlayer {
    id: string;
    name: string;
    position: Position;
    skill: number;
    potential: number;
    mental: number;
    fame: number;
    teamId?: string;
}
