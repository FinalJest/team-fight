import React from 'react';
import { ITeam } from '../../../types/ITeam';
import { IPlayer } from '../../../types/IPlayer';
import { getAttractionDifference } from '../../../services/playerService';
import { IRoster } from '../../../types/IRoster';
import { getTeamAttractionLevel } from '../../../services/teamService';
import { PlayerBlock } from './PlayerBlock';

interface PlayersPageProps {
    teams: ITeam[];
    freeMarketPlayers: IPlayer[];
    rosters: Record<ITeam['id'], IRoster>,
    lastTournamentWinner?: ITeam['id'],
}

export const PlayersPage: React.FC<PlayersPageProps> = ({
    teams,
    freeMarketPlayers,
    rosters,
    lastTournamentWinner,
}) => {
    const playersWithTeams: Record<IPlayer['id'], ITeam[]> = {};
    const playersToDisplay = [...freeMarketPlayers].sort((playerA, playerB) =>
        getAttractionDifference(playerB, playerA));

    playersToDisplay.forEach((player) => {
        teams.forEach((team) => {
            const teamRoster = rosters[team.id];
            const teamPlayer = teamRoster ? teamRoster[player.position] : undefined;
            if (getAttractionDifference(player, teamPlayer) > 0) {
                if (playersWithTeams[player.id]) {
                    playersWithTeams[player.id] = [...playersWithTeams[player.id], team];
                } else {
                    playersWithTeams[player.id] = [team];
                }
            }
        });
        playersWithTeams[player.id] = [...playersWithTeams[player.id] ?? []]
            .sort((teamA, teamB) =>
                getTeamAttractionLevel(
                    teamB,
                    lastTournamentWinner,
                ) - getTeamAttractionLevel(
                    teamA,
                    lastTournamentWinner,
                ));
    });

    return (
        <>
            {playersToDisplay.map((player) => {
                const interestedTeams = playersWithTeams[player.id];
                if (!interestedTeams) {
                    return null;
                }
                return <PlayerBlock player={player} interestedTeams={interestedTeams} rosters={rosters} />;
            })}
        </>
    );
};
