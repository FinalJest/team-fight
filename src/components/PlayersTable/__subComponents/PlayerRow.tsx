import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { IPlayer } from '../../../types/IPlayer';
import { TeamLogo } from '../../TeamLogo';
import { Position } from '../../../enums/Position';
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
    shouldHaveStandardActions?: boolean;
    isSub?: boolean;
    additionalCells?: React.ReactElement[];
}

export const PlayerRow: React.FC<PlayerRowProps> = ({
    player,
    shouldDisplayTeam,
    shouldHaveStandardActions,
    isSub,
    additionalCells,
}) => (
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
                {player.teamId ? <TeamLogo id={player.teamId} /> : '-'}
            </TableCell>
        )}
        {shouldHaveStandardActions && (
            <TableCell align="right">
                <ActionMenu
                    playerId={player.id}
                    teamId={player.teamId}
                    position={player.position}
                    isSub={isSub}
                    isRetired={player.isRetired}
                />
            </TableCell>
        )}
        {additionalCells && additionalCells.map((element, index) => (
            // no appropriate key, order of cells won't change
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={index} align="right">
                {element}
            </TableCell>
        ))}
    </TableRow>
);
