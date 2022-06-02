import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../modules';
import { getColorFromPlace } from '../../../services/placementService';
import { getTournamentById } from '../../../store/selectors';
import { ITeam } from '../../../types/ITeam';

interface HistoryProps {
    data: ITeam['history'];
}

export const TeamHistory: React.FC<HistoryProps> = ({ data }) => {
    const dataWithNames = useSelector((state: ReduxState) => data.map((item) => ({
        tournamentId: item.tournamentId,
        tournamentName: getTournamentById(item.tournamentId)(state)?.name ?? '',
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
                        Place
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataWithNames.map(({
                    tournamentId,
                    tournamentName,
                    place,
                }) => (
                    <TableRow key={tournamentId} sx={{ backgroundColor: getColorFromPlace(place) }}>
                        <TableCell align="left">
                            {tournamentName}
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
