import { IGroup } from './IGroup';
import { IPlayoff } from './IPlayoff';

export interface ITournament {
    id: string;
    name: string;
    teamCount: number;
    isFinished: boolean;
    isForFame: boolean;

    placements?: string[];
    mvpId?: string;
    group?: IGroup;
    playoff?: IPlayoff;
}
