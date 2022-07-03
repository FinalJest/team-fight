import React, { useMemo } from 'react';
import { NotificationType } from '../../enums/NotificationType';

interface INotificationsContext {
    addNotification(type: NotificationType, timeout?: number | null): void;
}

const NotificationsContext = React.createContext<INotificationsContext>({
    addNotification: () => {},
});

export const NotificationsContextProvider: React.FC<INotificationsContext> = ({
    children,
    addNotification,
}) => {
    const context = useMemo(() => ({
        addNotification,
    }), [addNotification]);
    return (
        <NotificationsContext.Provider value={context}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationContext = (): INotificationsContext => React.useContext(NotificationsContext);
