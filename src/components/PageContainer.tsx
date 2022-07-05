import styled from 'styled-components';
import React from 'react';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 14px;
`;

interface PageContainerProps {
    title?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
    React.useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
    return (
        <Container>
            {children}
        </Container>
    );
};
