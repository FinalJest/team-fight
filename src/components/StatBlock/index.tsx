import React from 'react';
import styled from 'styled-components';
import { Row } from './__subComponents/Row';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 40vw;
    border: 1px solid black;
`;

export type Stat = { name: string; data: string | React.ReactElement };

interface StatBlockProps {
    data: Stat[];
}

export const StatBlock: React.FC<StatBlockProps> = ({ data }) => (
    <Container>
        {data.map((element) => (<Row key={element.name} text={element.name} data={element.data} />))}
    </Container>
);
