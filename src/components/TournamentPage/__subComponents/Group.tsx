import React from 'react';
import {
    Table, TableBody, TableHead, TableRow, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { GroupResults } from '../../../types/IGroup';
import { getTeamsRecord } from '../../../store/selectors';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { GroupCell } from './GroupCell';
import { MatchTeamSelect } from './MatchTeamSelect';
import { NO_TEAM_VALUE } from '../../TeamSelect';
import { getPlaces, getPoints, getWins } from '../../../services/groupGenerator';
import { Fight } from './Fight';
import { TournamentFightType } from '../../../types/TournamentFightType';

interface GroupProps {
    name: string;
    results: GroupResults;
    teams: Array<string | undefined>;
    selectedTeams?: Set<string>;
}

export const Group: React.FC<GroupProps> = ({
    name,
    selectedTeams = new Set(),
    results,
    teams,
}) => {
    const teamsById = useSelector(getTeamsRecord);
    const places = getPlaces(results);
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
                        <GroupCell>
                            Wins
                        </GroupCell>
                        <GroupCell>
                            Points
                        </GroupCell>
                        <GroupCell>
                            Place
                        </GroupCell>
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
                                        excludedTeams={selectedTeams}
                                        groupName={name}
                                        indexInGroup={index}
                                    />
                                </GroupCell>
                                {teams.map((oppositeTeamId, ceilIndex) => {
                                    if (teamId === oppositeTeamId) {
                                        return (
                                            <GroupCell key={oppositeTeamId ?? ceilIndex}>
                                                {teamForRow
                                                    ? (
                                                        <TeamLogo
                                                            id={teamForRow.id}
                                                            size={ComponentSize.M}
                                                            src={teamForRow.logoUrl}
                                                        />
                                                    )
                                                    : ''}
                                            </GroupCell>
                                        );
                                    }

                                    const result = oppositeTeamId === undefined
                                        ? oppositeTeamId
                                        : teamResults && teamResults[oppositeTeamId];
                                    return (
                                        <GroupCell key={oppositeTeamId ?? ceilIndex}>
                                            <Fight
                                                result={result}
                                                type={TournamentFightType.Group}
                                                team1={teamId}
                                                team2={oppositeTeamId}
                                            />
                                        </GroupCell>
                                    );
                                })}
                                <GroupCell>
                                    {teamResults ? getWins(teamResults) : ''}
                                </GroupCell>
                                <GroupCell>
                                    {teamResults ? getPoints(teamResults) : ''}
                                </GroupCell>
                                <GroupCell>
                                    {teamId !== undefined ? places[teamId] : ''}
                                </GroupCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
