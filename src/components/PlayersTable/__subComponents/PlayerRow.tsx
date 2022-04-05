import React from 'react';
import { useSelector } from 'react-redux';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { IPlayer } from '../../../types/IPlayer';
import { Logo } from '../../Logo';
import { Position } from '../../../enums/Position';
import { getTeamById } from '../../../store/selectors';
import { ComponentSize } from '../../../enums/ComponentSize';

const getRowBgColor = (position: Position): string => {
    switch (position) {
        case Position.Top:
            return '#e5e5fe';
        case Position.Jungle:
            return '#daebda';
        case Position.Mid:
            return '#f0dddd';
        case Position.Carry:
            return '#f9f9e1';
        case Position.Support:
            return '#fff2ff';
        default:
            return 'white';
    }
};

interface PlayerRowProps {
    player: IPlayer;
    shouldDisplayTeam?: boolean;
    isDisabled?: boolean;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({ player, shouldDisplayTeam, isDisabled }) => {
    const team = useSelector(getTeamById(player.teamId));

    return (
        <TableRow sx={{ backgroundColor: getRowBgColor(player.position), opacity: isDisabled ? 0.6 : 'auto' }}>
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
            {shouldDisplayTeam && (
                <TableCell align="right">
                    {team ? <Logo size={ComponentSize.S} src={team.logoUrl} /> : '-'}
                </TableCell>
            )}
        </TableRow>
    );
};
