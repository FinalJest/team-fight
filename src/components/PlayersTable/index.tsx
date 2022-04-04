import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { IPlayer } from '../../types/IPlayer';
import { PlayerRow } from './__subComponents/PlayerRow';

interface RowData {
    data: IPlayer;

    isDisabled?: boolean;
}

interface PlayersTableProps {
    rowsData: RowData[];

    shouldDisplayTeam?: boolean;
}

export const PlayersTable: React.FC<PlayersTableProps> = ({ rowsData, shouldDisplayTeam }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell align="left">
                    Name
                </TableCell>
                <TableCell align="right">
                    Position
                </TableCell>
                <TableCell align="right">
                    Skill
                </TableCell>
                <TableCell align="right">
                    Potential
                </TableCell>
                <TableCell align="right">
                    Mental
                </TableCell>
                {shouldDisplayTeam && (
                    <TableCell align="right">
                        Team
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
        <TableBody>
            {rowsData.map(({ data, isDisabled }) => (
                <PlayerRow player={data} shouldDisplayTeam={shouldDisplayTeam} key={data.id} isDisabled={isDisabled} />
            ))}
        </TableBody>
    </Table>
);
