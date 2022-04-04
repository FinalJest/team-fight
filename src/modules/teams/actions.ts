import { action } from 'typesafe-actions';

import * as types from './actionTypes';

interface AddTeamProps {
    name: string;
    logoUrl: string;
}

export const addTeam = (props: AddTeamProps) => action(types.ADD_TEAM, props);
