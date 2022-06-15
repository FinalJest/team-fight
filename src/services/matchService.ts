import { ITeam } from '../types/ITeam';
import { TournamentFightType } from '../types/TournamentFightType';
import { PlayoffNode } from '../types/IPlayoff';

const SEPARATOR = '+';

export const isTournamentFightType = (type: string): type is TournamentFightType =>
    type === TournamentFightType.Group || type === TournamentFightType.Playoff;

export const getMatchId = (
    type: TournamentFightType,
    team1: ITeam['id'],
    team2: ITeam['id'],
    nodeId?: PlayoffNode['id'],
): string => [type, team1, team2, ...nodeId !== undefined ? [nodeId] : []].join(SEPARATOR);

export const parseMatchId = (matchId: string): [
    TournamentFightType, ITeam['id'], ITeam['id'], PlayoffNode['id'] | undefined,
] | null => {
    const splitId = matchId.split(SEPARATOR);
    if (!isTournamentFightType(splitId[0])) {
        return null;
    }

    return [splitId[0], splitId[1], splitId[2], splitId[3]];
};
