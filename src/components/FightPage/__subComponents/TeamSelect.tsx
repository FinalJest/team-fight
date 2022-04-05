import React from 'react';
import { useSelector } from 'react-redux';
import {
    MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { getTeams } from '../../../store/selectors';

interface TeamSelectProps {
    currentTeam?: string;
    onTeamSelect(id: string): void;
}

export const TeamSelect: React.FC<TeamSelectProps> = ({ currentTeam, onTeamSelect }) => {
    const teams = useSelector(getTeams);
    const handleChange = (e: SelectChangeEvent): void => {
        onTeamSelect(e.target.value);
    };

    return (
        <Select
            value={currentTeam ?? ''}
            sx={{ width: '100%' }}
            onChange={handleChange}
        >
            {teams.map((team) => <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>)}
        </Select>
    );
};
