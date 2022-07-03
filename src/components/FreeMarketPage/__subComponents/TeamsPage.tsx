import React from 'react';
import styled from 'styled-components';
import { ITeam } from '../../../types/ITeam';
import { IPlayer } from '../../../types/IPlayer';
import { IRoster } from '../../../types/IRoster';
import { getAttractionDifference } from '../../../services/playerService';
import { TeamBlock } from './TeamBlock';
import { getTeamAttractionLevel } from '../../../services/teamService';

const AttractionContainer = styled.div`
    border: 1px solid darkred;
    margin-bottom: 12px;
`;

interface TeamsPageProps {
    teams: ITeam[];
    freeMarketPlayers: IPlayer[];
    rosters: Record<ITeam['id'], IRoster>,
    lastTournamentWinner?: ITeam['id'],
}

export const TeamsPage: React.FC<TeamsPageProps> = ({
    teams,
    freeMarketPlayers,
    rosters,
    lastTournamentWinner,
}) => {
    const teamsWithAttractionLevel = teams.map((team) => ({
        data: team,
        attraction: getTeamAttractionLevel(team, lastTournamentWinner),
    })).sort((teamA, teamB) => teamB.attraction - teamA.attraction);
    let lastLevel: number = teamsWithAttractionLevel[0]?.attraction ?? 0;

    const teamsByAttraction = teamsWithAttractionLevel.reduce<ITeam[][]>((result, team) => {
        const newResult = [...result];
        if (lastLevel === team.attraction) {
            if (newResult[newResult.length - 1]) {
                newResult[newResult.length - 1] = [...newResult[newResult.length - 1], team.data];
            } else {
                newResult.push([team.data]);
            }
        } else {
            lastLevel = team.attraction;
            newResult.push([team.data]);
        }
        return newResult;
    }, []);

    const teamsWithPlayers: Record<ITeam['id'], IPlayer[]> = {};

    freeMarketPlayers.forEach((player) => {
        teams.forEach((team) => {
            const teamRoster = rosters[team.id];
            const teamPlayer = teamRoster ? teamRoster[player.position] : undefined;
            if (getAttractionDifference(player, teamPlayer) > 0) {
                const teamWithPotentialPlayers = teamsWithPlayers[team.id];
                if (teamWithPotentialPlayers) {
                    teamsWithPlayers[team.id] = [...teamWithPotentialPlayers, player];
                } else {
                    teamsWithPlayers[team.id] = [player];
                }
            }
        });
    });

    return (
        <>
            {
                teamsByAttraction.map((teamsOnLevel, index) => (
                    // no appropriate key, order of levels won't change
                    // eslint-disable-next-line react/no-array-index-key
                    <AttractionContainer key={index}>
                        {teamsOnLevel.map((team) => {
                            const potentialPlayers = teamsWithPlayers[team.id];
                            const roster = rosters[team.id];
                            if (!potentialPlayers?.length) {
                                return null;
                            }
                            return (
                                <TeamBlock
                                    key={team.id}
                                    team={team}
                                    potentialPlayers={potentialPlayers}
                                    roster={roster}
                                />
                            );
                        })}
                    </AttractionContainer>
                ))
            }
        </>
    );
};
