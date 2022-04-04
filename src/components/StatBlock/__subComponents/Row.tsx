import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const StatRowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
`;

interface StatRowProps {
    text: string;
    data: string | React.ReactElement;
}

export const Row: React.FC<StatRowProps> = ({ text, data }) => (
    <StatRowContainer>
        <Typography variant="body1">{text}</Typography>
        {React.isValidElement(data) ? data : <Typography variant="body2">{data}</Typography>}
    </StatRowContainer>
);
