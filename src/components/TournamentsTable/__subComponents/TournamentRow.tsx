import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { ITournament } from '../../../types/ITournament';
import { IPlayer } from '../../../types/IPlayer';
import { ITeam } from '../../../types/ITeam';
import { Logo } from '../../Logo';
import { ComponentSize } from '../../../enums/ComponentSize';

export interface RowData {
    data: ITournament;

    mvp?: IPlayer;
    winner?: ITeam;
}

export const TournamentRow: React.FC<RowData> = ({ data, mvp, winner }) => (
    <TableRow>
        <TableCell align="left">
            <Link to={`/tournaments/${data.id}`}>
                {data.name}
            </Link>
        </TableCell>
        <TableCell align="right">
            {data.teamCount}
        </TableCell>
        <TableCell align="right">
            {winner ? (
                <Link to={`/teams/${winner.id}`}>
                    <Logo size={ComponentSize.S} src={winner.logoUrl} />
                </Link>
            ) : '-'}
        </TableCell>
        <TableCell align="right">
            {mvp ? (
                <Link to={`/players/${mvp.id}`}>
                    {mvp.name}
                </Link>
            ) : '-'}
        </TableCell>
    </TableRow>
);
