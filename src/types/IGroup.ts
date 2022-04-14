import { ITeam } from './ITeam';

export type GroupResult = [number, number] | undefined;
export type GroupTeamResult = Record<ITeam['id'], GroupResult>;
export type GroupResults = Record<ITeam['id'], GroupTeamResult>;

export type GroupsComposition = Record<string, Array<ITeam['id'] | undefined>>;

export interface IGroup {
    results: GroupResults;
    composition: GroupsComposition;
}
