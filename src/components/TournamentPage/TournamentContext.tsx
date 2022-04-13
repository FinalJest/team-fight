import React from 'react';

const TournamentContext = React.createContext<string>('');

interface ITournamentContextProps {
    id: string;
}

export const TournamentContextProvider: React.FC<ITournamentContextProps> = ({ children, id }) => (
    <TournamentContext.Provider value={id}>
        {children}
    </TournamentContext.Provider>
);

export const useTournamentContext = (): string => React.useContext(TournamentContext);
