import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../../logo.svg';

const StyledApp = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Logo = styled.img`
    height: 40vmin;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${spin} infinite 20s linear;
    }
`;

const Link = styled.a`
    color: #61dafb;
`;

export const App: React.FC = () => (
    <StyledApp>
        <Header>
            <Logo src={logo} alt="logo" />
            <p>
                Edit
                {' '}
                <code>src/App.tsx</code>
                {' '}
                and save to reload.
            </p>
            <Link
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </Link>
        </Header>
    </StyledApp>
);
