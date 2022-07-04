import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { IPlayer } from '../../../types/IPlayer';
import { PlayersTable } from '../../PlayersTable';
import { IRoster } from '../../../types/IRoster';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { changePlayersTeam, replacePlayer } from '../../../modules/players/thunk';
import {
    addTeamToTransferred,
    makeTeamInterestedInPlayer,
    makeTeamUninterestedInPlayer,
    removePlayerFromInterested,
} from '../../../modules/freeMarket/actions';
import { ReduxState } from '../../../modules';

function getDiff(player: IPlayer, roster: IRoster): [React.ReactElement, React.ReactElement, React.ReactElement] {
    const currentPlayer = roster[player.position] || { skill: 0, potential: 0, mental: 0 };
    return [
        <span>{player.skill - currentPlayer.skill}</span>,
        <span>{player.potential - currentPlayer.potential}</span>,
        <span>{player.mental - currentPlayer.mental}</span>,
    ];
}

interface FreeMarketPlayersTableProps {
    teamId: string;
    players: IPlayer[];
    currentRoster: IRoster;
}

export const FreeMarketPlayersTable: React.FC<FreeMarketPlayersTableProps> = ({
    teamId,
    players,
    currentRoster,
}) => {
    const playersWithInterestedTeams = useSelector((state: ReduxState) =>
        state.freeMarket.playersWithTeamsActivelyInterested);
    const dispatch = useReduxDispatch();
    const getHandleReplace = (player: IPlayer) => () => {
        const oldPlayer = currentRoster[player.position];
        if (!oldPlayer) {
            return;
        }
        dispatch(replacePlayer(player, oldPlayer));
        dispatch(addTeamToTransferred(teamId));
        dispatch(removePlayerFromInterested(player.id));
    };
    const getHandleAdd = (player: IPlayer) => () => {
        dispatch(changePlayersTeam(player, teamId));
        dispatch(addTeamToTransferred(teamId));
        dispatch(removePlayerFromInterested(player.id));
    };
    const getHandleInterested = (player: IPlayer) => () => {
        const isAlreadyInterested = playersWithInterestedTeams[player.id]?.includes(teamId);
        if (isAlreadyInterested) {
            dispatch(makeTeamUninterestedInPlayer(player.id, teamId));
        } else {
            dispatch(makeTeamInterestedInPlayer(player.id, teamId));
        }
    };
    return (
        <PlayersTable
            shouldHaveStandardActions={false}
            rowsData={players.map((player) => ({
                data: player,
                additionalCells: [
                    ...getDiff(player, currentRoster),
                    <Button
                        variant="contained"
                        disabled={!currentRoster[player.position]}
                        onClick={getHandleReplace(player)}
                    >
                        R
                    </Button>,
                    <Button variant="contained" onClick={getHandleAdd(player)}>+</Button>,
                    <Button
                        onClick={getHandleInterested(player)}
                    >
                        {playersWithInterestedTeams[player.id]?.includes(teamId) ? 'Remove' : 'Interest'}
                    </Button>,
                ],
            }))}
            additionalHeaders={['Skill Diff', 'Poten. Diff', 'Ment. Diff', 'Replace', 'Add', 'Interested']}
        />
    );
};
