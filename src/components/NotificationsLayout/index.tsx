import React from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { NotificationsContextProvider } from './NotificationsContext';
import { NotificationType } from '../../enums/NotificationType';
import { Notification } from '../Notification';

const NotificationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 8px;
    width: 100%;
`;

export const NotificationsLayout: React.FC = ({ children }) => {
    const [activeNotifications, setActiveNotifications] = React.useState<Record<string, React.ReactElement>>({});
    const getHandleClose = (id: string) => () => {
        const newNotifications = { ...activeNotifications };
        delete newNotifications[id];
        setActiveNotifications(newNotifications);
    };
    const handleAddNotification = (type: NotificationType, timeout?: number | null) => {
        const id = nanoid();
        setActiveNotifications({
            ...activeNotifications,
            [id]: <Notification key={id} type={type} onClose={getHandleClose(id)} timeout={timeout} />,
        });
    };

    return (
        <NotificationsContextProvider addNotification={handleAddNotification}>
            {children}
            <NotificationsContainer>
                {Object.values(activeNotifications)}
            </NotificationsContainer>
        </NotificationsContextProvider>
    );
};
