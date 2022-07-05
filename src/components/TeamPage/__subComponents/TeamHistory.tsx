import {
    Table, TableBody, TableRow,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReduxState } from '../../../modules';
import { getColorFromPlace } from '../../../services/placementService';
import { getTournamentById } from '../../../store/selectors';
import { ITeam } from '../../../types/ITeam';
import { RosterHistory } from './RosterHistory';
import { HistoryCell } from './HistoryCell';
import { Path } from '../../../enums/Path';

const Container = styled.div`
    max-width: 100%;
    overflow-x: scroll;
`;

interface HistoryProps {
    data: ITeam['history'];
}

export const TeamHistory: React.FC<HistoryProps> = ({ data }) => {
    const dataWithNames = useSelector((state: ReduxState) => data.map((item) => ({
        tournamentId: item.tournamentId,
        tournamentName: getTournamentById(item.tournamentId)(state)?.name ?? '',
        roster: item.roster,
        place: item.place,
        isForFame: state.tournaments.find((tourney) => tourney.id === item.tournamentId)?.isForFame,
    })));

    return (
        <Container>
            <Table>
                <TableBody>
                    <TableRow>
                        {dataWithNames.map(({ tournamentId, tournamentName }) => (
                            <HistoryCell key={tournamentId} isBold>
                                <Link to={`/${Path.Tournaments}/${tournamentId}`}>
                                    {tournamentName}
                                </Link>
                            </HistoryCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {dataWithNames.map(({ tournamentId, place, isForFame }) => (
                            <HistoryCell
                                key={tournamentId}
                                backgroundColor={isForFame ? getColorFromPlace(place) : 'auto'}
                            >
                                {place}
                            </HistoryCell>
                        ))}
                    </TableRow>
                    <RosterHistory data={dataWithNames} />
                </TableBody>
            </Table>
        </Container>
    );
};
