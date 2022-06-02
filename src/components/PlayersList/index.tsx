import React from 'react';
import { useSelector } from 'react-redux';
import { PlayersTable } from '../PlayersTable';
import { getPlayers } from '../../store/selectors';
import { AddPlayer } from '../modals/player/AddPlayer';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { ProgressPlayersButton } from './__subComponents/ProgressPlayersButton';

export const PlayersList: React.FC = () => {
    const list = useSelector(getPlayers);

    return (
        <PageContainer>
            <PlayersTable rowsData={list.map((player) => ({ data: player }))} shouldDisplayTeam />
            <ButtonsContainer>
                <AddPlayer />
                <ProgressPlayersButton />
            </ButtonsContainer>
        </PageContainer>
    );
};
