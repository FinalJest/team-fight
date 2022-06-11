import React from 'react';
import { TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ITeam } from '../../../types/ITeam';
import { getPlayersRecord } from '../../../store/selectors';
import { HistoryCell } from './HistoryCell';
import { Path } from '../../../enums/Path';

interface RosterHistoryProps {
    data: ITeam['history'];
}

export const RosterHistory: React.FC<RosterHistoryProps> = ({ data }) => {
    const players = useSelector(getPlayersRecord);
    return (
        <>
            <TableRow>
                {data.map(({ tournamentId, roster }) => (
                    <HistoryCell key={tournamentId}>
                        <Link to={`/${Path.Players}/${roster.top}`}>
                            {roster.top && players[roster.top].name}
                        </Link>
                    </HistoryCell>
                ))}
            </TableRow>
            <TableRow>
                {data.map(({ tournamentId, roster }) => (
                    <HistoryCell key={tournamentId}>
                        <Link to={`/${Path.Players}/${roster.jungle}`}>
                            {roster.jungle && players[roster.jungle].name}
                        </Link>
                    </HistoryCell>
                ))}
            </TableRow>
            <TableRow>
                {data.map(({ tournamentId, roster }) => (
                    <HistoryCell key={tournamentId}>
                        <Link to={`/${Path.Players}/${roster.mid}`}>
                            {roster.mid && players[roster.mid].name}
                        </Link>
                    </HistoryCell>
                ))}
            </TableRow>
            <TableRow>
                {data.map(({ tournamentId, roster }) => (
                    <HistoryCell key={tournamentId}>
                        <Link to={`/${Path.Players}/${roster.carry}`}>
                            {roster.carry && players[roster.carry].name}
                        </Link>
                    </HistoryCell>
                ))}
            </TableRow>
            <TableRow>
                {data.map(({ tournamentId, roster }) => (
                    <HistoryCell key={tournamentId}>
                        <Link to={`/${Path.Players}/${roster.support}`}>
                            {roster.support && players[roster.support].name}
                        </Link>
                    </HistoryCell>
                ))}
            </TableRow>
        </>
    );
};
