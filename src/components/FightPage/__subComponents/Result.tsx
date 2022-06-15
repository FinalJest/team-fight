import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { Results } from '../../../types/Results';
import { getTeamById } from '../../../store/selectors';
import { resultsToScore } from '../../../services/fightSimulator';
import { ReduxState } from '../../../modules';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
`;

const ResultSquaresContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

const ResultSquare = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 4px;
`;

interface ResultProps {
    results: Results;
    teams: Array<string | undefined>;
}

export const Result: React.FC<ResultProps> = ({ results, teams }) => {
    const team1WinsDiff = results.filter((winnerIndex) => winnerIndex === 0).length - results.length / 2;
    const { team1Data, team2Data } = useSelector((state: ReduxState) => ({
        team1Data: getTeamById(teams[0])(state),
        team2Data: getTeamById(teams[1])(state),
    }));
    const winner = team1WinsDiff >= 0 ? team1Data : team2Data;
    const score = resultsToScore(results);

    return (
        <Container>
            <TeamLogo
                id={team1WinsDiff ? winner?.id : undefined}
                size={ComponentSize.L}
            />
            <Typography variant="h3">
                {`${score[0]} : ${score[1]}`}
            </Typography>
            <ResultSquaresContainer>
                {results.map((result) =>
                    <ResultSquare key={nanoid()} style={{ backgroundColor: result ? 'red' : 'green' }} />)}
            </ResultSquaresContainer>
        </Container>
    );
};
