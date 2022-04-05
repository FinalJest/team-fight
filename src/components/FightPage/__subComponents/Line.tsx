import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;

const BackLine = styled.div`
    width: 100%;
    height: 50px;
    background-color: #e7aaaa;
`;

const FrontLine = styled.div`
    height: 100%;
    background-color: #a0daa0;
`;

const InfoBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface LineProps {
    left: number;
    right: number;
}

export const Line: React.FC<LineProps> = ({ left, right }) => (
    <Container>
        <BackLine>
            <FrontLine style={{ width: `${(100 * left) / (left + right)}%` }} />
        </BackLine>
        <InfoBlock>
            <Typography variant="h4">
                {left}
            </Typography>
            <Typography variant="h4">
                {right}
            </Typography>
        </InfoBlock>
    </Container>
);
