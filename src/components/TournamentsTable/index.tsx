import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { RowData, TournamentRow } from './__subComponents/TournamentRow';

interface TournamentsTableProps {
    rowsData: RowData[];
}

export const TournamentsTable: React.FC<TournamentsTableProps> = ({ rowsData }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell align="left">
                    Name
                </TableCell>
                <TableCell align="right">
                    Team Count
                </TableCell>
                <TableCell align="right">
                    Winner
                </TableCell>
                <TableCell align="right">
                    MVP
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rowsData.map((row) => (
                <TournamentRow key={row.data.id} {...row} />
            ))}
        </TableBody>
    </Table>
);
