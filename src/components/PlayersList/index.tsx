import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel } from '@mui/material';
import { PlayersTable } from '../PlayersTable';
import { getPlayers } from '../../store/selectors';
import { AddPlayer } from '../modals/player/AddPlayer';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { ProgressPlayersButton } from './__subComponents/ProgressPlayersButton';
import { IPlayer } from '../../types/IPlayer';
import { Position } from '../../enums/Position';

const getSortWeight = (player: IPlayer): number => {
    let baseWeight = 0;
    if (player.isRetired) {
        baseWeight = 10000;
    }
    let positionWeight = 0;
    switch (player.position) {
        case Position.Top:
            positionWeight = 1000;
            break;
        case Position.Jungle:
            positionWeight = 2000;
            break;
        case Position.Mid:
            positionWeight = 3000;
            break;
        case Position.Carry:
            positionWeight = 4000;
            break;
        case Position.Support:
            positionWeight = 5000;
            break;
        default:
            break;
    }
    return baseWeight + positionWeight + (1000 - player.skill);
};

const FREE_MARKET_TEXT = 'Show Free Market';

export const PlayersList: React.FC = () => {
    const [isFreeMarket, setIsFreeMarket] = React.useState(false);
    const list = useSelector(getPlayers);
    const listToDisplay = isFreeMarket
        ? list.filter((player) => player.teamId === undefined && !player.isRetired)
        : list.sort((playerA, playerB) => getSortWeight(playerA) - getSortWeight(playerB));

    return (
        <PageContainer title="Players">
            <FormControlLabel
                control={<Checkbox onChange={() => { setIsFreeMarket(!isFreeMarket); }} />}
                label={FREE_MARKET_TEXT}
            />
            <PlayersTable rowsData={listToDisplay.map((player) => ({ data: player }))} shouldDisplayTeam />
            <ButtonsContainer>
                <AddPlayer />
                <ProgressPlayersButton />
            </ButtonsContainer>
        </PageContainer>
    );
};
