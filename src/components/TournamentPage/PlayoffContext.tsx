import React, { useMemo } from 'react';
import { ITeam } from '../../types/ITeam';

interface IPlayoffContext {
    selectedTeams: Set<ITeam['id']>;
}

const PlayoffContext = React.createContext<IPlayoffContext>({ selectedTeams: new Set() });

export const PlayoffContextProvider: React.FC<IPlayoffContext> = ({ children, selectedTeams }) => {
    const context = useMemo(() => ({ selectedTeams }), [selectedTeams]);
    return (
        <PlayoffContext.Provider value={context}>
            {children}
        </PlayoffContext.Provider>
    );
};

export const usePlayoffContext = (): IPlayoffContext => React.useContext(PlayoffContext);
