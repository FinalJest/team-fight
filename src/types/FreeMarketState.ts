import { ITeam } from './ITeam';
import { IPlayer } from './IPlayer';

export interface FreeMarketState {
    teamsThatDidTransfer: ITeam['id'][];
    playersWithTeamsActivelyInterested: Record<IPlayer['id'], ITeam['id'][]>;
}
