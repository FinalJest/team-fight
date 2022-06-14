import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { ITournament } from '../../../types/ITournament';
import { IPlayer } from '../../../types/IPlayer';
import { ITeam } from '../../../types/ITeam';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { Path } from '../../../enums/Path';

export interface RowData {
    data: ITournament;

    mvp?: IPlayer;
    winner?: ITeam;
}

export const TournamentRow: React.FC<RowData> = ({ data, mvp, winner }) => (
    <TableRow>
        <TableCell align="left">
            <Link to={`/${Path.Tournaments}/${data.id}`}>
                {data.name}
            </Link>
        </TableCell>
        <TableCell align="right">
            {data.teamCount}
        </TableCell>
        <TableCell align="right">
            {winner ? <TeamLogo size={ComponentSize.S} id={winner.id} /> : '-'}
        </TableCell>
        <TableCell align="right">
            {mvp ? (
                <Link to={`/${Path.Players}/${mvp.id}`}>
                    {mvp.name}
                </Link>
            ) : '-'}
        </TableCell>
    </TableRow>
);
