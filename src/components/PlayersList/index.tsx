import React from 'react';
import { useSelector } from 'react-redux';
import { PlayersTable } from '../PlayersTable';
import { getPlayers } from '../../store/selectors';

export const PlayersList: React.FC = () => {
    const list = useSelector(getPlayers);

    return <PlayersTable rowsData={list.map((player) => ({ data: player }))} shouldDisplayTeam />;
};
