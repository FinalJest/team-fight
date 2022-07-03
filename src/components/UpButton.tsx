import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

interface ContainerProps {
    isShown: boolean;
}

const Container = styled.div<ContainerProps>`
    display: ${({ isShown }) => (isShown ? 'block' : 'none')};
    position: fixed;
    right: 8px;
    bottom: 8px;
    background-color: white;
    border-radius: 4px;
`;

export const UpButton: React.FC = () => {
    const [isShown, setIsShown] = React.useState(false);
    React.useEffect(() => {
        const handleScroll = () => {
            const isShownNew = window.scrollY > window.innerHeight;
            if (isShownNew !== isShown) {
                setIsShown(isShownNew);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isShown]);
    const handleScrollUp = () => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
    };
    return (
        <Container isShown={isShown}>
            <Button variant="contained" onClick={handleScrollUp}>
                UP
            </Button>
        </Container>
    );
};
