import React from 'react';
import { useSelector } from 'react-redux';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReduxState } from '../../../modules';
import { IPlayer } from '../../../types/IPlayer';
import { Logo } from '../../Logo';

interface PlayerRowProps {
    player: IPlayer;
    shouldDisplayTeam?: boolean;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({ player, shouldDisplayTeam }) => {
    const team = useSelector((state: ReduxState) => (shouldDisplayTeam
        ? state.teams.find((teamData) => player.teamId === teamData.id)
        : undefined));

    return (
        <TableRow>
            <TableCell align="left">
                <Link to={`/players/${player.id}`}>
                    {player.name}
                </Link>
            </TableCell>
            <TableCell align="right">
                {player.position}
            </TableCell>
            <TableCell align="right">
                {player.skill}
            </TableCell>
            <TableCell align="right">
                {player.potential}
            </TableCell>
            <TableCell align="right">
                {player.mental}
            </TableCell>
            {team && (
                <TableCell align="right">
                    <Logo src={team.logoUrl} />
                </TableCell>
            )}
        </TableRow>
    );
};
