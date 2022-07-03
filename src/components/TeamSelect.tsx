import React from 'react';
import { useSelector } from 'react-redux';
import {
    MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { getEnabledTeams, getTeams } from '../store/selectors';
import { doesTeamHaveFullRoster } from '../services/teamService';
import { ITeam } from '../types/ITeam';

interface TeamSelectProps {
    excludedTeams?: Set<ITeam['id']>;
    currentTeam: ITeam['id'];
    onTeamSelect(id: string): void;

    shouldIncludeDisabledTeams?: boolean;
}

export const NO_TEAM_VALUE = 'no_team';

export const TeamSelect: React.FC<TeamSelectProps> = ({
    excludedTeams = new Set(),
    currentTeam,
    onTeamSelect,
    shouldIncludeDisabledTeams,
}) => {
    const teams = useSelector(shouldIncludeDisabledTeams ? getTeams : getEnabledTeams);
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
                .filter((team) => !excludedTeams?.has(team.id) || currentTeam === team.id)
                .map((team) => (
                    <MenuItem
                        sx={{ color: doesTeamHaveFullRoster(team.roster) ? 'auto' : 'red' }}
                        key={team.id}
                        value={team.id}
                    >
                        {team.name}
                    </MenuItem>
                ))}
            <MenuItem value={NO_TEAM_VALUE}>No Team</MenuItem>
        </Select>
    );
};
