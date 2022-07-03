import { action } from 'typesafe-actions';

import * as types from './actionTypes';
import { ITeam } from '../../types/ITeam';
import { IPlayer } from '../../types/IPlayer';

/** These actions could be called directly */
export const makeTeamInterestedInPlayer = (
    playerId: IPlayer['id'],
    teamId: ITeam['id'],
) => action(types.MAKE_TEAM_INTERESTED_IN_PLAYER, {
    playerId,
    teamId,
});
export const makeTeamUninterestedInPlayer = (
    playerId: IPlayer['id'],
    teamId: ITeam['id'],
) => action(types.MAKE_TEAM_UNINTERESTED_IN_PLAYER, {
    playerId,
    teamId,
});
export const removePlayerFromInterested = (playerId: IPlayer['id']) =>
    action(types.REMOVE_PLAYER_FROM_INTERESTED, playerId);
export const addTeamToTransferred = (teamId: ITeam['id']) => action(types.ADD_TEAM_TO_TRANSFERRED, teamId);
export const resetWholeMarket = () => action(types.RESET_WHOLE_MARKET);
