import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { TeamLogo } from '../TeamLogo';
import { Path } from '../../enums/Path';
import { ITeam, TeamWithStats } from '../../types/ITeam';

interface RowData {
    data: TeamWithStats | ITeam;

    isHighlighted?: boolean;
    additionalCells?: React.ReactElement[];
}

interface TeamsTableProps {
    rowsData: RowData[];

    additionalHeaders?: string[];
}

export const TeamsTable: React.FC<TeamsTableProps> = ({ rowsData, additionalHeaders }) => {
    if (!rowsData.length) {
        return null;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="left" sx={{ width: '34px' }}>
                        Logo
                    </TableCell>
                    <TableCell align="left">
                        Name
                    </TableCell>
                    {'power' in rowsData[0].data && (
                        <TableCell align="right">
                            Power
                        </TableCell>
                    )}
                    {'mental' in rowsData[0].data && (
                        <TableCell align="right">
                            Mental
                        </TableCell>
                    )}
                    <TableCell align="right">
                        Fame
                    </TableCell>
                    {'rosterFame' in rowsData[0].data && (
                        <TableCell align="right">
                            Roster Fame
                        </TableCell>
                    )}
                    {additionalHeaders && additionalHeaders.map((header) => (
                        <TableCell key={header} align="right">
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rowsData.map(({ data: team, additionalCells, isHighlighted }) => (
                    <TableRow
                        key={team.id}
                        sx={{
                            opacity: team.isDisabled ? 0.5 : 1,
                            border: isHighlighted ? '4px solid yellow' : 'auto',
                        }}
                    >
                        <TableCell align="left">
                            <TeamLogo id={team.id} />
                        </TableCell>
                        <TableCell align="left">
                            <Link to={`/${Path.Teams}/${team.id}`}>
                                {team.name}
                            </Link>
                        </TableCell>
                        {'power' in team && (
                            <TableCell align="right">
                                {team.power}
                            </TableCell>
                        )}
                        {'mental' in team && (
                            <TableCell align="right">
                                {team.mental}
                            </TableCell>
                        )}
                        <TableCell align="right">
                            {team.fame}
                        </TableCell>
                        {'rosterFame' in team && (
                            <TableCell align="right">
                                {team.rosterFame}
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
                ))}
            </TableBody>
        </Table>
    );
};
