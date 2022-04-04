import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import styled from 'styled-components';
import { ReduxState } from '../../modules';
import { StatRow } from './__subComponents/StatRow';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 14px;
`;

const Logo = styled.img`
    width: 150px;
    height: 150px;
`;

const TeamStats = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    border: 1px solid black;
`;

export const TeamPage: React.FC = () => {
    const { teamId } = useParams();
    const { data, players } = useSelector((state: ReduxState) => ({
        data: state.teams.find((team) => team.id === teamId),
        players: state.players.filter((player) => player.teamId === teamId),
    }));

    if (!data) {
        return null;
    }

    return (
        <Container>
            <Typography variant="h2">
                {data.name}
            </Typography>
            <Logo src={data.logoUrl} alt="logo" />
            <TeamStats>
                <StatRow text="Fame" data={`${data.fame}`} />
            </TeamStats>
            <Typography variant="h4">
                Roster
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            Name
                        </TableCell>
                        <TableCell align="right">
                            Position
                        </TableCell>
                        <TableCell align="right">
                            Skill
                        </TableCell>
                        <TableCell align="right">
                            Potential
                        </TableCell>
                        <TableCell align="right">
                            Mental
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.id}>
                            <TableCell align="left">
                                {player.name}
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};
