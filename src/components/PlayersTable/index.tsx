import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { IPlayer } from '../../types/IPlayer';
import { PlayerRow } from './__subComponents/PlayerRow';

interface PlayersTableProps {
    players: IPlayer[];

    shouldDisplayTeam?: boolean;
}

export const PlayersTable: React.FC<PlayersTableProps> = ({ players, shouldDisplayTeam }) => (
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
            {players.map((player) => (
                <PlayerRow player={player} shouldDisplayTeam={shouldDisplayTeam} key={player.id} />
            ))}
        </TableBody>
    </Table>
);
