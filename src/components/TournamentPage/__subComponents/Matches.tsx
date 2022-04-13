import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ITournament } from '../../../types/ITournament';
import { Group } from './Group';

const Container = styled.div`
    width: 100%;
`;

interface MatchesProps {
    data: ITournament;
}

export const Matches: React.FC<MatchesProps> = ({ data }) => {
    const groups = data.group && (
        <Container>
            <Typography variant="h3">
                Groups
            </Typography>
            {Object.entries(data.group.composition).map(([groupName, teams]) => (
                <Group
                    key={groupName}
                    name={groupName}
                    results={data.group!.results}
                    teams={teams}
                />
            ))}
        </Container>
    );
    const playoff = data.playoff && (
        <Container>
            <Typography variant="h1">
                Play-off
            </Typography>
        </Container>
    );

    return (
        <>
            {groups}
            {playoff}
        </>
    );
};
