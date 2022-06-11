import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel } from '@mui/material';
import { PlayersTable } from '../PlayersTable';
import { getPlayers } from '../../store/selectors';
import { AddPlayer } from '../modals/player/AddPlayer';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { ProgressPlayersButton } from './__subComponents/ProgressPlayersButton';

const FREE_MARKET_TEXT = 'Show Free Market';

export const PlayersList: React.FC = () => {
    const [isFreeMarket, setIsFreeMarket] = React.useState(false);
    const list = useSelector(getPlayers);
    const listToDisplay = isFreeMarket ? list.filter((player) => player.teamId === undefined) : list;

    return (
        <PageContainer>
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
