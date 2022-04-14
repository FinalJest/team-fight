import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { PageContainer } from '../PageContainer';
import { TeamBlock } from './__subComponents/TeamBlock';
import { Result } from './__subComponents/Result';
import { initialState, reducer } from './module';
import { addResults, setTeam } from './module/actions';
import { Line } from './__subComponents/Line';
import { useTeamsPowers } from '../../hooks/useTeamPower';
import { FightButtons } from './__subComponents/FightButtons';
import { Results } from '../../types/Results';
import { ITeam } from '../../types/ITeam';

const TeamsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

interface FightPageProps {
    predeterminedTeams?: [ITeam['id'], ITeam['id']];
    onFight?(results: Results): void;
}

export const FightPage: React.FC<FightPageProps> = ({ predeterminedTeams, onFight }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const teamsToFight = predeterminedTeams || state.teams;
    const [team1Power, team2Power] = useTeamsPowers(teamsToFight);

    const getHandleSelect = (index: 0 | 1) => (id: string) => dispatch(setTeam(id, index));
    const handleFight = (results: Results): void => {
        dispatch(addResults(results));
        if (onFight) {
            onFight(results);
        }
    };

    return (
        <PageContainer>
            <Typography variant="h1">
                Fight
            </Typography>
            <TeamsBlock>
                <TeamBlock
                    onTeamSelect={getHandleSelect(0)}
                    currentTeam={teamsToFight[0]}
                    isDisabled={Boolean(predeterminedTeams)}
                />
                <Result results={state.results} teams={teamsToFight} />
                <TeamBlock
                    onTeamSelect={getHandleSelect(1)}
                    currentTeam={teamsToFight[1]}
                    isDisabled={Boolean(predeterminedTeams)}
                />
            </TeamsBlock>
            <Line left={team1Power} right={team2Power} />
            <FightButtons ids={teamsToFight} onFight={handleFight} />
        </PageContainer>
    );
};
