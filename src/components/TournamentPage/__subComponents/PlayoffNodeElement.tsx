import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { PlayoffNode } from '../../../types/IPlayoff';
import { PlayoffNodePartElement } from './PlayoffNodePartElement';
import { PlayoffFight } from './PlayoffFight';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';

const Container = styled.div`
    display: flex;
    column-gap: 20px;
`;

const TeamsContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
`;

const Winner = styled.div`
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 220px;
    border: 1px solid black;
`;

interface PlayoffNodeProps {
    data: PlayoffNode,
    isLast?: boolean;
}

export const PlayoffNodeElement: React.FC<PlayoffNodeProps> = ({ data, isLast }) => (
    <Container>
        <TeamsContainer>
            <PlayoffNodePartElement
                data={data}
                part={0}
            />
            {data.winner === null && (
                <PlayoffFight
                    nodeId={data.id}
                    team1={data.parts[0].teamId ?? undefined}
                    team2={data.parts[1].teamId ?? undefined}
                />
            )}
            <PlayoffNodePartElement
                data={data}
                part={1}
            />
        </TeamsContainer>
        {isLast && (
            <Winner>
                <Typography variant="h3">
                    WINNER
                </Typography>
                <TeamLogo id={data.winner ?? undefined} size={ComponentSize.L} />
            </Winner>
        )}
    </Container>
);
