import React, { useMemo } from 'react';
import styled from 'styled-components';
import { IPlayoff } from '../../../types/IPlayoff';
import { PlayoffLevel } from './PlayoffLevel';
import { ITeam } from '../../../types/ITeam';
import { PlayoffContextProvider } from '../PlayoffContext';

const Container = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
`;

interface PlayoffProps {
    data: IPlayoff;
}

export const Playoff: React.FC<PlayoffProps> = ({ data }) => {
    const selectedTeamsPlayoff = useMemo(() => {
        const lastLevel = data.composition[data.composition.length - 1];
        return lastLevel.reduce<Set<ITeam['id']>>((result, node) => {
            const nodeData = data.data[node];
            if (!nodeData) {
                return result;
            }
            nodeData.parts.forEach((part) => {
                if (part.teamId !== null) {
                    result.add(part.teamId);
                }
            });
            return result;
        }, new Set());
    }, [data]);

    return (
        <PlayoffContextProvider selectedTeams={selectedTeamsPlayoff}>
            <Container>
                {data.composition.map((level, index) =>
                    // Index is consistent and the only meaningful key here
                    // eslint-disable-next-line react/no-array-index-key
                    <PlayoffLevel key={index} data={data.data} level={level} />)}
            </Container>
        </PlayoffContextProvider>
    );
};
