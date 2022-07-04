import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ITournament } from '../../../types/ITournament';
import { Group } from './Group';
import { Playoff } from './Playoff';

const Container = styled.div`
    width: 100%;
`;

interface MatchesProps {
    data: ITournament;
}

export const Matches: React.FC<MatchesProps> = ({ data }) => {
    let groups: React.ReactElement | null = null;

    if (data.group) {
        const selectedTeams = Object.values(data.group.composition).reduce((res, group) => {
            group.filter((team): team is string => team !== undefined).forEach((team) => {
                res.add(team);
            });
            return res;
        }, new Set<string>());
        groups = (
            <Container>
                <Typography variant="h3">
                    Groups
                </Typography>
                {Object.entries(data.group.composition).map(([groupName, teams]) => (
                    <Group
                        key={groupName}
                        name={groupName}
                        selectedTeams={selectedTeams}
                        results={data.group!.results}
                        teams={teams}
                    />
                ))}
            </Container>
        );
    }
    const playoff = data.playoff && (
        <Container>
            <Typography variant="h3">
                Play-off
            </Typography>
            <Playoff data={data.playoff} />
        </Container>
    );

    return (
        <>
            {groups}
            {playoff}
        </>
    );
};
