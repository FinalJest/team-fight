import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { NotificationType } from '../../enums/NotificationType';
import { SEC } from '../../constants/time';

const DEFAULT_TIMEOUT = 5 * SEC;

function getTextFromType(type: NotificationType): string {
    switch (type) {
        case NotificationType.FreeMarketReset:
            return 'Free Market has been reset.';
        default:
            return 'Unknown';
    }
}

const Container = styled.div`
    display: flex;
    position: relative;
    border-radius: 8px;
    width: 60%;
    padding: 8px;
    background-color: white;
    border: 1px solid black;
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    right: 2px;
    top: 2px;
`;

interface NotificationProps {
    type: NotificationType;

    /** При null timeout не запускается */
    timeout?: number | null;

    onClose?(): void;
}

export const Notification: React.FC<NotificationProps> = ({
    type,
    timeout = DEFAULT_TIMEOUT,
    onClose,
}) => {
    React.useEffect(() => {
        if (timeout === null) {
            return () => {};
        }
        const timeoutId = setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeout, onClose]);
    return (
        <Container>
            {getTextFromType(type)}
            <CloseButtonContainer>
                <Button onClick={onClose}>
                    x
                </Button>
            </CloseButtonContainer>
        </Container>
    );
};
