import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../modules';
import { getColorFromPlace } from '../../../services/placementService';
import { getTeamById, getTournamentById } from '../../../store/selectors';
import { IPlayer } from '../../../types/IPlayer';
import { TeamLogo } from '../../TeamLogo';

interface HistoryProps {
    data: IPlayer['history'];
}

export const PlayerHistory: React.FC<HistoryProps> = ({ data }) => {
    const dataWithNames = useSelector((state: ReduxState) => data.map((item) => ({
        tournamentId: item.tournamentId,
        tournamentName: getTournamentById(item.tournamentId)(state)?.name ?? '',
        isForFame: state.tournaments.find((tourney) => tourney.id === item.tournamentId)?.isForFame,
        team: getTeamById(item.teamId)(state),
        place: item.place,
    })));

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        Tournament Name
                    </TableCell>
                    <TableCell align="right">
                        Team
                    </TableCell>
                    <TableCell align="right">
                        Place
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataWithNames.map(({
                    tournamentId,
                    tournamentName,
                    team,
                    place,
                    isForFame,
                }) => (
                    <TableRow
                        key={tournamentId}
                        sx={{ backgroundColor: isForFame ? getColorFromPlace(place) : 'auto' }}
                    >
                        <TableCell align="left">
                            {tournamentName}
                        </TableCell>
                        <TableCell align="right">
                            {team ? <TeamLogo src={team.logoUrl} id={team.id} /> : ''}
                        </TableCell>
                        <TableCell align="right">
                            {place}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
