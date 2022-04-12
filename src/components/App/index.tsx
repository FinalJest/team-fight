import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TeamsList } from '../TeamsList';
import { TeamPage } from '../TeamPage';
import { PlayersList } from '../PlayersList';
import { PlayerPage } from '../PlayerPage';
import { FightPage } from '../FightPage';
import { SettingsPage } from '../SettingsPage';
import { TournamentsPage } from '../TournamentsPage';
import { TournamentPage } from '../TournamentPage';

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
    padding: 12px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

export const App: React.FC = () => (
    <StyledApp>
        <Header>
            <StyledLink to="teams">Teams</StyledLink>
            <StyledLink to="players">Players</StyledLink>
            <StyledLink to="fight">Fight</StyledLink>
            <StyledLink to="settings">Settings</StyledLink>
            <StyledLink to="tournaments">Tournaments</StyledLink>
        </Header>
        <Content>
            <Routes>
                <Route path="/" element={<TeamsList />} />
                <Route path="teams">
                    <Route path="" element={<TeamsList />} />
                    <Route path=":teamId" element={<TeamPage />} />
                </Route>
                <Route path="players">
                    <Route path="" element={<PlayersList />} />
                    <Route path=":playerId" element={<PlayerPage />} />
                </Route>
                <Route path="fight" element={<FightPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="tournaments">
                    <Route path="" element={<TournamentsPage />} />
                    <Route path=":tournamentId" element={<TournamentPage />} />
                </Route>
            </Routes>
        </Content>
    </StyledApp>
);
