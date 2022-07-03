import React from 'react';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { PlayersTable } from '../../PlayersTable';
import { TeamsTable } from '../../TeamsTable';
import { IPlayer } from '../../../types/IPlayer';
import { ITeam } from '../../../types/ITeam';
import { IRoster } from '../../../types/IRoster';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { changePlayersTeam, replacePlayer } from '../../../modules/players/thunk';
import { addTeamToTransferred } from '../../../modules/freeMarket/actions';
import { ReduxState } from '../../../modules';

const Container = styled.div`
    border: 1px solid darkred;
    padding: 8px 4px;
    margin-bottom: 12px;
`;

interface PlayerBlockProps {
    player: IPlayer;
    interestedTeams: ITeam[];
    rosters: Record<ITeam['id'], IRoster>,
}

export const PlayerBlock: React.FC<PlayerBlockProps> = ({ player, interestedTeams, rosters }) => {
    const activelyInterestedTeams = useSelector((state: ReduxState) =>
        state.freeMarket.playersWithTeamsActivelyInterested[player.id]);
    const dispatch = useReduxDispatch();
    const getHandleReplace = (team: ITeam) => () => {
        const currentRoster = rosters[team.id] ?? {};
        const oldPlayer = currentRoster[player.position];
        if (!oldPlayer) {
            return;
        }
        dispatch(replacePlayer(player, oldPlayer));
        dispatch(addTeamToTransferred(team.id));
    };
    const getHandleAdd = (team: ITeam) => () => {
        dispatch(changePlayersTeam(player, team.id));
        dispatch(addTeamToTransferred(team.id));
    };
    if (!interestedTeams.length) {
        return null;
    }
    return (
        <Container key={player.id}>
            <PlayersTable rowsData={[{ data: player }]} />
            <Typography variant="h4">
                Interested Teams
            </Typography>
            <TeamsTable
                rowsData={interestedTeams.map((team) => ({
                    data: team,
                    isHighlighted: activelyInterestedTeams && activelyInterestedTeams.includes(team.id),
                    additionalCells: [
                        <Button
                            disabled={!rosters[team.id][player.position]}
                            onClick={getHandleReplace(team)}
                        >
                            R
                        </Button>,
                        <Button onClick={getHandleAdd(team)}>+</Button>,
                    ],
                }))}
                additionalHeaders={['Replace', 'Add']}
            />
        </Container>
    );
};
