import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import {
    getEnabledTeams, getFreeMarketPlayers, getLastFamedTournament, getMainRoster,
} from '../../store/selectors';
import { ReduxState } from '../../modules';
import { TeamsPage } from './__subComponents/TeamsPage';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { useReduxDispatch } from '../../hooks/useReduxDispatch';
import { resetWholeMarket } from '../../modules/freeMarket/actions';
import { useNotificationContext } from '../NotificationsLayout/NotificationsContext';
import { NotificationType } from '../../enums/NotificationType';
import { ITeam } from '../../types/ITeam';
import { IRoster } from '../../types/IRoster';
import { PlayersPage } from './__subComponents/PlayersPage';

interface SubPageContainerProps {
    displayed: boolean;
}

const SubPageContainer = styled.div<SubPageContainerProps>`
    display: ${({ displayed }) => (displayed ? 'auto' : 'none')};
`;

type Page = 'teams' | 'players';

export const FreeMarketPage: React.FC = () => {
    const [page, setPage] = React.useState<Page>('teams');
    const {
        teams, freeMarketPlayers, rosters, lastTournamentWinner,
    } = useSelector((state: ReduxState) => {
        const lastTournament = getLastFamedTournament(state);
        const teamsFromState = getEnabledTeams(state);
        return {
            teams: teamsFromState,
            freeMarketPlayers: getFreeMarketPlayers(state),
            rosters: teamsFromState.reduce<Record<ITeam['id'], IRoster>>((result, team) => {
                const mainRoster = getMainRoster(team.id)(state);
                if (!mainRoster) {
                    return result;
                }
                return { ...result, [team.id]: mainRoster };
            }, {}),
            lastTournamentWinner: lastTournament?.placements?.length ? lastTournament.placements[0] : undefined,
        };
    });
    const dispatch = useReduxDispatch();
    const { addNotification } = useNotificationContext();
    const handleResetFreeMarket = (): void => {
        dispatch(resetWholeMarket());
        addNotification(NotificationType.FreeMarketReset);
    };
    const handleSwitchToNextPage = (): void => {
        setPage(page === 'teams' ? 'players' : 'teams');
    };
    const nextPageTitle = page === 'teams' ? 'Players Page' : 'Teams Page';

    return (
        <PageContainer>
            <Typography variant="h2">
                Free Market Page
            </Typography>
            <SubPageContainer displayed={page === 'teams'}>
                <TeamsPage
                    teams={teams}
                    freeMarketPlayers={freeMarketPlayers}
                    rosters={rosters}
                    lastTournamentWinner={lastTournamentWinner}
                />
            </SubPageContainer>
            <SubPageContainer displayed={page === 'players'}>
                <PlayersPage
                    teams={teams}
                    freeMarketPlayers={freeMarketPlayers}
                    rosters={rosters}
                    lastTournamentWinner={lastTournamentWinner}
                />
            </SubPageContainer>
            <ButtonsContainer>
                <Button variant="contained" onClick={handleResetFreeMarket}>
                    Reset Free Market
                </Button>
                <Button variant="contained" onClick={handleSwitchToNextPage}>
                    {`Switch to ${nextPageTitle}`}
                </Button>
            </ButtonsContainer>
        </PageContainer>
    );
};
