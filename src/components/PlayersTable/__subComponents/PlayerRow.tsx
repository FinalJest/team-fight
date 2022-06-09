import React from 'react';
import { useSelector } from 'react-redux';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { IPlayer } from '../../../types/IPlayer';
import { TeamLogo } from '../../TeamLogo';
import { Position } from '../../../enums/Position';
import { getTeamById } from '../../../store/selectors';
import { ActionMenu } from './ActionMenu';
import { Path } from '../../../enums/Path';

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
    isSub?: boolean;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({ player, shouldDisplayTeam, isSub }) => {
    const team = useSelector(getTeamById(player.teamId));

    return (
        <TableRow
            sx={{ backgroundColor: getRowBgColor(player.position), opacity: isSub || player.isRetired ? 0.5 : 'auto' }}
        >
            <TableCell align="left">
                <Link to={`/${Path.Players}/${player.id}`}>
                    {`${player.name}${player.isRetired ? ' (retired)' : ''}`}
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
            <TableCell align="right">
                {player.fame}
            </TableCell>
            {shouldDisplayTeam && (
                <TableCell align="right">
                    {team ? <TeamLogo src={team.logoUrl} id={team.id} /> : '-'}
                </TableCell>
            )}
            <TableCell align="right">
                <ActionMenu
                    playerId={player.id}
                    teamId={team?.id}
                    position={player.position}
                    isSub={isSub}
                    isRetired={player.isRetired}
                />
            </TableCell>
        </TableRow>
    );
};
