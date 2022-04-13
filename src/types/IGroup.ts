type GroupResult = [number, number] | undefined;
type GroupTeamResult = Record<string, GroupResult>;

export type GroupResults = Record<string, GroupTeamResult>;

export type GroupsComposition = Record<string, Array<string | undefined>>;

export interface IGroup {
    results: GroupResults;
    composition: GroupsComposition;
}
