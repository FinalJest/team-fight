import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../modules';
import { PlayersTable } from '../PlayersTable';

export const PlayersList: React.FC = () => {
    const list = useSelector((state: ReduxState) => state.players);

    return <PlayersTable rowsData={list.map((player) => ({ data: player }))} shouldDisplayTeam />;
};
