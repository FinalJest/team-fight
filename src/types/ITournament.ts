import { IGroup } from './IGroup';

export interface ITournament {
    id: string;
    name: string;
    teamCount: number;
    winnerId?: string;
    mvpId?: string;
    group?: IGroup;
    playoff?: unknown; // TODO: playoff logic and types
}
