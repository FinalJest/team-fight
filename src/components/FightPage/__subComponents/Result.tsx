import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Logo } from '../../Logo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { Results } from '../../../types/Results';
import { getTeamById } from '../../../store/selectors';

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
    const totalWinner = results.filter((winnerIndex) => winnerIndex === 0).length > results.length / 2
        ? teams[0]
        : teams[1];
    const winnerLogo = useSelector(getTeamById(totalWinner))?.logoUrl;
    const score = results.reduce((acc, winnerId) =>
        acc.map((singleScore, index) => (index === winnerId ? singleScore + 1 : singleScore)), [0, 0]);

    return (
        <Container>
            <Logo size={ComponentSize.L} src={results.length ? winnerLogo : undefined} />
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
