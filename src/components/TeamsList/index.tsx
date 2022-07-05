import React from 'react';
import { useSelector } from 'react-redux';
import { AddTeam } from '../modals/team/AddTeam';
import { getTeamsWithStats } from '../../store/selectors';
import { ButtonsContainer } from '../ButtonsContainer';
import { PageContainer } from '../PageContainer';
import { TeamsTable } from '../TeamsTable';

export const TeamsList: React.FC = () => {
    const teams = useSelector(getTeamsWithStats);
    const sortedTeams = teams.sort((teamA, teamB) => {
        if (Number(teamA.isDisabled) - Number(teamB.isDisabled)) {
            return Number(teamA.isDisabled) - Number(teamB.isDisabled);
        }
        /** Sorting teams with 0 power to the bottom */
        const [powerABool, powerBBool] = [teamA.power, teamB.power].map((power) => Number(Boolean(power)));
        if (powerBBool - powerABool) {
            return powerBBool - powerABool;
        }
        if (teamB.fame - teamA.fame) {
            return teamB.fame - teamA.fame;
        }
        if (teamB.rosterFame - teamA.rosterFame) {
            return teamB.rosterFame - teamA.rosterFame;
        }
        return teamB.power - teamA.power;
    });
    return (
        <PageContainer title="Teams">
            {Boolean(sortedTeams.length) && <TeamsTable rowsData={sortedTeams.map((team) => ({ data: team }))} />}
            <ButtonsContainer>
                <AddTeam />
            </ButtonsContainer>
        </PageContainer>
    );
};
