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
import {
    getLoses, getPlaces, getPoints, getWins,
} from '../../../services/groupService';
import { useTournamentContext } from '../TournamentContext';
import { getColorFromPlace } from '../../../services/placementService';
import { isStronger } from '../../../services/comparisonService';
import { ITeam } from '../../../types/ITeam';
import { GroupFight } from './GroupFight';

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
    const { isFinished } = useTournamentContext();
    const places = getPlaces(results, isFinished);
    const sortedTeams: Record<ITeam['id'], number> = teams
        .filter<string>((teamId): teamId is string => teamId !== undefined)
        .sort((teamA, teamB) =>
            (isStronger(
                [teamsById[teamA]?.power, teamsById[teamA]?.mental],
                [teamsById[teamB]?.power, teamsById[teamB]?.mental],
            ) ? 1 : -1))
        .reduce((result, teamId, index) => ({
            ...result,
            [teamId]: index + 1,
        }), {});
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
                            <GroupCell key={teamId ?? index} isBold>
                                {teamId !== undefined && teamsById[teamId]?.name}
                            </GroupCell>
                        ))}
                        <GroupCell>
                            Wins
                        </GroupCell>
                        <GroupCell>
                            Loses
                        </GroupCell>
                        <GroupCell>
                            Points
                        </GroupCell>
                        <GroupCell>
                            Place
                        </GroupCell>
                        {!isFinished && (
                            <GroupCell>
                                Prediction (Skill)
                            </GroupCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((teamId, index) => {
                        const teamForRow = teamId === undefined ? teamId : teamsById[teamId];
                        const teamResults = teamId === undefined ? teamId : results[teamId];
                        const teamComponent = teamId ? teamsById[teamId]?.name : undefined;
                        const teamPlace: number | undefined = teamId === undefined ? undefined : sortedTeams[teamId];
                        return (
                            <TableRow key={teamId ?? index}>
                                <GroupCell isBold>
                                    {isFinished
                                        ? teamComponent
                                        : (
                                            <MatchTeamSelect
                                                currentTeam={teamId ?? NO_TEAM_VALUE}
                                                excludedTeams={selectedTeams}
                                                groupName={name}
                                                indexInGroup={index}
                                            />
                                        )}
                                </GroupCell>
                                {teams.map((oppositeTeamId, ceilIndex) => {
                                    let content: React.ReactElement | string = '';
                                    if (teamId === oppositeTeamId) {
                                        content = teamForRow
                                            ? (
                                                <TeamLogo
                                                    id={teamForRow.id}
                                                    size={ComponentSize.M}
                                                />
                                            )
                                            : '';
                                    } else {
                                        const result = oppositeTeamId === undefined
                                            ? undefined
                                            : teamResults && teamResults[oppositeTeamId];
                                        if (result || !isFinished) {
                                            content = (
                                                <GroupFight
                                                    result={result}
                                                    team1={teamId}
                                                    team2={oppositeTeamId}
                                                />
                                            );
                                        }
                                    }

                                    return (
                                        <GroupCell key={oppositeTeamId ?? ceilIndex}>
                                            {content}
                                        </GroupCell>
                                    );
                                })}
                                <GroupCell>
                                    {teamResults && getWins(teamResults)}
                                </GroupCell>
                                <GroupCell>
                                    {teamResults && getLoses(teamResults)}
                                </GroupCell>
                                <GroupCell
                                    isBold
                                    fontSize="20px"
                                >
                                    {teamResults && getPoints(teamResults)}
                                </GroupCell>
                                <GroupCell
                                    isBold
                                    fontSize="20px"
                                    backgroundColor={teamId ? getColorFromPlace(places[teamId]) : undefined}
                                >
                                    {teamId !== undefined ? places[teamId] : ''}
                                </GroupCell>
                                {!isFinished && (
                                    <GroupCell>
                                        {teamPlace !== undefined ? `${teamPlace} (${teamForRow?.power})` : ''}
                                    </GroupCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
