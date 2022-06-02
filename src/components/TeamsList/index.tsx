import React from 'react';
import { useSelector } from 'react-redux';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AddTeam } from '../modals/team/AddTeam';
import { getTeamsWithStats } from '../../store/selectors';
import { ButtonsContainer } from '../ButtonsContainer';
import { PageContainer } from '../PageContainer';
import { TeamLogo } from '../TeamLogo';
import { Path } from '../../enums/Path';

export const TeamsList: React.FC = () => {
    const teams = useSelector(getTeamsWithStats);
    return (
        <PageContainer>
            {Boolean(teams.length) && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: '34px' }}>
                                Logo
                            </TableCell>
                            <TableCell align="left">
                                Name
                            </TableCell>
                            <TableCell align="right">
                                Power
                            </TableCell>
                            <TableCell align="right">
                                Mental
                            </TableCell>
                            <TableCell align="right">
                                Fame
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell align="left">
                                    <TeamLogo id={team.id} src={team.logoUrl} />
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={`/${Path.Teams}/${team.id}`}>
                                        {team.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {team.power}
                                </TableCell>
                                <TableCell align="right">
                                    {team.mental}
                                </TableCell>
                                <TableCell align="right">
                                    {team.fame}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <ButtonsContainer>
                <AddTeam />
            </ButtonsContainer>
        </PageContainer>
    );
};
