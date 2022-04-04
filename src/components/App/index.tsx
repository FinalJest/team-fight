import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TeamsList } from '../TeamsList';
import { TeamPage } from '../TeamPage';
import { PlayersList } from '../PlayersList';
import { PlayerPage } from '../PlayerPage';

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

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

export const App: React.FC = () => (
    <StyledApp>
        <Header>
            <StyledLink to="teams">Teams</StyledLink>
            <StyledLink to="players">Players</StyledLink>
        </Header>
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
        </Routes>
    </StyledApp>
);
