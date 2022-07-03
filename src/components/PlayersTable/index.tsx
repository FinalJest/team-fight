import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { IPlayer } from '../../types/IPlayer';
import { PlayerRow } from './__subComponents/PlayerRow';

interface RowData {
    data: IPlayer;

    isSub?: boolean;
    additionalCells?: React.ReactElement[];
}

interface PlayersTableProps {
    rowsData: RowData[];

    additionalHeaders?: string[];
    shouldDisplayTeam?: boolean;
    shouldHaveStandardActions?: boolean;
}

export const PlayersTable: React.FC<PlayersTableProps> = ({
    rowsData,
    shouldDisplayTeam,
    shouldHaveStandardActions = true,
    additionalHeaders,
}) => (
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
                <TableCell align="right">
                    Fame
                </TableCell>
                {shouldDisplayTeam && (
                    <TableCell align="right">
                        Team
                    </TableCell>
                )}
                {shouldHaveStandardActions && (
                    <TableCell align="right">
                        Actions
                    </TableCell>
                )}
                {additionalHeaders && additionalHeaders.map((header) => (
                    <TableCell key={header} align="right">
                        {header}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {rowsData.map(({ data, isSub, additionalCells }) => (
                <PlayerRow
                    player={data}
                    shouldHaveStandardActions={shouldHaveStandardActions}
                    shouldDisplayTeam={shouldDisplayTeam}
                    key={data.id}
                    additionalCells={additionalCells}
                    isSub={isSub}
                />
            ))}
        </TableBody>
    </Table>
);
