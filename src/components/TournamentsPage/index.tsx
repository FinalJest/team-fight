import React from 'react';
import { useSelector } from 'react-redux';
import { PageContainer } from '../PageContainer';
import { getPlayerById, getTeamById, getTournaments } from '../../store/selectors';
import { ButtonsContainer } from '../ButtonsContainer';
import { AddTournament } from '../modals/tournaments/AddTournament';
import { TournamentsTable } from '../TournamentsTable';
import { ReduxState } from '../../modules';

export const TournamentsPage: React.FC = () => {
    const rowsData = useSelector((state: ReduxState) => {
        const stateTournaments = getTournaments(state);
        return stateTournaments.map((stateTournament) => {
            const winner = getTeamById(stateTournament.placements && stateTournament.placements[0])(state);
            const mvp = getPlayerById(stateTournament.mvpId)(state);
            return {
                data: stateTournament,
                winner,
                mvp,
                isHighlighted: stateTournament.isForFame,
            };
        }).reverse();
    });

    return (
        <PageContainer>
            <TournamentsTable rowsData={rowsData} />
            <ButtonsContainer>
                <AddTournament />
            </ButtonsContainer>
        </PageContainer>
    );
};
