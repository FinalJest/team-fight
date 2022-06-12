import { IGroup } from './IGroup';

export interface ITournament {
    id: string;
    name: string;
    teamCount: number;
    isFinished: boolean;
    isForFame: boolean;
    placements?: string[];
    mvpId?: string;
    group?: IGroup;
    playoff?: unknown; // TODO: playoff logic and types
}
