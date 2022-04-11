import { IPlayer } from './IPlayer';

export interface IRosterIds {
    top?: IPlayer['id'];
    jungle?: IPlayer['id'];
    mid?: IPlayer['id'];
    carry?: IPlayer['id'];
    support?: IPlayer['id'];
    other?: Array<IPlayer['id']>;
}

export interface IRoster {
    top: IPlayer;
    jungle: IPlayer;
    mid: IPlayer;
    carry: IPlayer;
    support: IPlayer;
}
