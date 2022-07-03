import { IRoster, IRosterIds } from '../types/IRoster';
import { IPlayer } from '../types/IPlayer';
import { ITeam } from '../types/ITeam';

export const doesTeamHaveFullRoster = (roster: IRosterIds): boolean => [
    roster.top,
    roster.jungle,
    roster.mid,
    roster.carry,
    roster.support,
].filter((player) => player !== undefined).length === 5;

export const createRosterWithPlayer = (player: IPlayer, roster: IRosterIds): IRosterIds => (roster[player.position]
    ? { other: roster.other ? [...roster.other, player.id] : [player.id] }
    : { [player.position]: player.id });

export const removePlayersFromRoster = (players: IPlayer[], roster: IRosterIds): IRosterIds =>
    players.reduce((result, player) => {
        const wasOnMainTeam = roster[player.position] === player.id;
        return wasOnMainTeam
            ? { ...result, [player.position]: undefined }
            : { ...result, other: result.other && roster.other!.filter((sub) => sub !== player.id) };
    }, { other: roster.other });

export const getRosterFame = (roster?: IRoster): number => {
    if (!roster) {
        return 0;
    }
    return (Object.values(roster) as (IPlayer | undefined)[])
        .filter<IPlayer>((player): player is IPlayer => player !== undefined)
        .reduce((acc, player) => acc + player.fame, 0);
};

export const getTeamAttractionLevel = (team: ITeam, lastTournamentWinner?: ITeam['id']): number => {
    if (team.id === lastTournamentWinner) {
        return Infinity;
    }
    return team.fame;
};
