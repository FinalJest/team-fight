import React from 'react';
import { useSelector } from 'react-redux';
import { PlayersTable } from '../PlayersTable';
import { getPlayers } from '../../store/selectors';
import { AddPlayerModal } from '../modals/player/AddPlayerModal';
import { PageContainer } from '../PageContainer';

export const PlayersList: React.FC = () => {
    const list = useSelector(getPlayers);

    return (
        <PageContainer>
            <PlayersTable rowsData={list.map((player) => ({ data: player }))} shouldDisplayTeam />
            <AddPlayerModal />
        </PageContainer>
    );
};
