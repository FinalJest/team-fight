import { ITeam } from '../types/ITeam';
import { TournamentFightType } from '../types/TournamentFightType';

const SEPARATOR = '+';

export const isTournamentFightType = (type: string): type is TournamentFightType =>
    type === TournamentFightType.Group || type === TournamentFightType.Playoff;

export const getMatchId = (
    type: TournamentFightType,
    team1: ITeam['id'],
    team2: ITeam['id'],
): string => `${type}${SEPARATOR}${team1}${SEPARATOR}${team2}`;

export const parseMatchId = (matchId: string): [TournamentFightType, ITeam['id'], ITeam['id']] | null => {
    const splitId = matchId.split(SEPARATOR);
    if (!isTournamentFightType(splitId[0])) {
        return null;
    }

    return [splitId[0], splitId[1], splitId[2]];
};
