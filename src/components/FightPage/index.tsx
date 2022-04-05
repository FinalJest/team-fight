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

const TeamsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const FightPage: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [team1Power, team2Power] = useTeamsPowers(state.teams);

    const getHandleSelect = (index: 0 | 1) => (id: string) => dispatch(setTeam(id, index));
    const handleFight = (results: Results): void => {
        dispatch(addResults(results));
    };

    return (
        <PageContainer>
            <Typography variant="h1">
                Fight
            </Typography>
            <TeamsBlock>
                <TeamBlock onTeamSelect={getHandleSelect(0)} currentTeam={state.teams[0]} />
                <Result results={state.results} teams={state.teams} />
                <TeamBlock onTeamSelect={getHandleSelect(1)} currentTeam={state.teams[1]} />
            </TeamsBlock>
            <Line left={team1Power} right={team2Power} />
            <FightButtons ids={state.teams} onFight={handleFight} />
        </PageContainer>
    );
};
