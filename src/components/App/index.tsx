import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FightPage } from '../FightPage';
import { SettingsPage } from '../SettingsPage';
import { Path } from '../../enums/Path';
import { TeamsList } from '../TeamsList';
import { TeamPage } from '../TeamPage';
import { PlayersList } from '../PlayersList';
import { PlayerPage } from '../PlayerPage';
import { TournamentsPage } from '../TournamentsPage';
import { TournamentPage } from '../TournamentPage';
import { TournamentFightSubpage } from '../TournamentFightSubpage';

const StyledApp = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: #282c34;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    column-gap: 10px;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Content = styled.div`
    padding: 12px 12px 60px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

export const App: React.FC = () => (
    <StyledApp>
        <Header>
            <StyledLink to={Path.Teams}>Teams</StyledLink>
            <StyledLink to={Path.Players}>Players</StyledLink>
            <StyledLink to={Path.Fight}>Fight</StyledLink>
            <StyledLink to={Path.Tournaments}>Tournaments</StyledLink>
            <StyledLink to={Path.Settings}>Settings</StyledLink>
        </Header>
        <Content>
            <Routes>
                <Route path="/" element={<FightPage />} />
                <Route path={Path.Teams}>
                    <Route path="" element={<TeamsList />} />
                    <Route path=":teamId" element={<TeamPage />} />
                </Route>
                <Route path={Path.Players}>
                    <Route path="" element={<PlayersList />} />
                    <Route path=":playerId" element={<PlayerPage />} />
                </Route>
                <Route path={Path.Fight} element={<FightPage />} />
                <Route path={Path.Settings} element={<SettingsPage />} />
                <Route path={Path.Tournaments}>
                    <Route path="" element={<TournamentsPage />} />
                    <Route path=":tournamentId">
                        <Route path="" element={<TournamentPage />} />
                        <Route path=":matchId" element={<TournamentFightSubpage />} />
                    </Route>
                </Route>
            </Routes>
        </Content>
    </StyledApp>
);
