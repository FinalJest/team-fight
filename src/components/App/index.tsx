import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TeamsList } from '../TeamsList';
import { TeamPage } from '../TeamPage';

const StyledApp = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: #282c34;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const StyledLink = styled(Link)`
    color: white;
`;

export const App: React.FC = () => (
    <StyledApp>
        <Header>
            <StyledLink to="teams">Teams</StyledLink>
        </Header>
        <Routes>
            <Route path="/" element={<TeamsList />} />
            <Route path="teams">
                <Route path="" element={<TeamsList />} />
                <Route path=":teamId" element={<TeamPage />} />
            </Route>
        </Routes>
    </StyledApp>
);
