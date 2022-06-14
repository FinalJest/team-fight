import { ITeam } from './ITeam';

export interface NodePart {
    teamId: ITeam['id'] | null;
    score: number;
    prevNode?: PlayoffNode['id'];
}

export interface PlayoffNode {
    id: string;
    parts: [NodePart, NodePart];
    winner: ITeam['id'] | null;
}

export interface IPlayoff {
    data: Record<PlayoffNode['id'], PlayoffNode>;
    composition: PlayoffNode['id'][][];
}
