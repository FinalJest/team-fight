import React, { useMemo } from 'react';

interface ITournamentContext {
    id: string;
    isFinished: boolean;
}

const TournamentContext = React.createContext<ITournamentContext>({ id: '', isFinished: false });

export const TournamentContextProvider: React.FC<ITournamentContext> = ({ children, id, isFinished }) => {
    const context = useMemo(() => ({ id, isFinished }), [id, isFinished]);
    return (
        <TournamentContext.Provider value={context}>
            {children}
        </TournamentContext.Provider>
    );
};

export const useTournamentContext = (): ITournamentContext => React.useContext(TournamentContext);
