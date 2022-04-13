import React from 'react';
import { useSelector } from 'react-redux';
import {
    MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { getTeams } from '../store/selectors';

interface TeamSelectProps {
    excludedTeams?: string[];
    currentTeam: string;
    onTeamSelect(id: string): void;
}

export const NO_TEAM_VALUE = 'no_team';

export const TeamSelect: React.FC<TeamSelectProps> = ({
    excludedTeams = [],
    currentTeam,
    onTeamSelect,
}) => {
    const teams = useSelector(getTeams);
    const handleChange = (e: SelectChangeEvent): void => {
        onTeamSelect(e.target.value);
    };

    return (
        <Select
            value={currentTeam}
            sx={{ width: '100%' }}
            onChange={handleChange}
        >
            {teams
                .filter((team) => !excludedTeams.includes(team.id) || currentTeam === team.id)
                .map((team) => <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>)}
            <MenuItem value={NO_TEAM_VALUE}>No Team</MenuItem>
        </Select>
    );
};
