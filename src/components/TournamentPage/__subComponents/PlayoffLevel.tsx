import React from 'react';
import styled from 'styled-components';
import { IPlayoff, PlayoffNode } from '../../../types/IPlayoff';
import { PlayoffNodeElement } from './PlayoffNodeElement';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 60px;
`;

interface PlayoffLevelProps {
    data: IPlayoff['data'];
    level: PlayoffNode['id'][];
}

export const PlayoffLevel: React.FC<PlayoffLevelProps> = ({ data, level }) => (
    <Container>
        {level.map((node) => (
            <PlayoffNodeElement key={data[node].id} data={data[node]} isLast={level.length === 1} />
        ))}
    </Container>
);
