import React from 'react';
import {
    Table, TableBody, TableHead, TableRow, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { GroupResults } from '../../../types/IGroup';
import { getTeamsRecord } from '../../../store/selectors';
import { Logo } from '../../Logo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { GroupCell } from './GroupCell';
import { MatchTeamSelect } from './MatchTeamSelect';
import { NO_TEAM_VALUE } from '../../TeamSelect';

interface GroupProps {
    name: string;
    results: GroupResults;
    teams: Array<string | undefined>;
}

export const Group: React.FC<GroupProps> = ({
    name,
    results,
    teams,
}) => {
    const teamsById = useSelector(getTeamsRecord);
    return (
        <div>
            <Typography variant="h3">
                {name}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <GroupCell>
                            Team
                        </GroupCell>
                        {teams.map((teamId, index) => (
                            <GroupCell key={teamId ?? index}>
                                {teamId !== undefined && teamsById[teamId]?.name}
                            </GroupCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((teamId, index) => {
                        const teamForRow = teamId === undefined ? teamId : teamsById[teamId];
                        const teamResults = teamId === undefined ? teamId : results[teamId];
                        return (
                            <TableRow key={teamId ?? index}>
                                <GroupCell>
                                    <MatchTeamSelect
                                        currentTeam={teamId ?? NO_TEAM_VALUE}
                                        excludedTeams={teams.filter((team): team is string => team !== undefined)}
                                        groupName={name}
                                        indexInGroup={index}
                                    />
                                </GroupCell>
                                {teams.map((oppositeTeamId, ceilIndex) => {
                                    if (teamId === oppositeTeamId) {
                                        return (
                                            <GroupCell key={oppositeTeamId ?? ceilIndex}>
                                                {teamForRow
                                                    ? <Logo size={ComponentSize.M} src={teamForRow.logoUrl} />
                                                    : ''}
                                            </GroupCell>
                                        );
                                    }

                                    const result = oppositeTeamId === undefined
                                        ? oppositeTeamId
                                        : teamResults && teamResults[oppositeTeamId];
                                    return (
                                        <GroupCell key={oppositeTeamId ?? ceilIndex}>
                                            {result ? result.join(':') : ''}
                                        </GroupCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
