import { ReduxState } from './modules';
import { ReduxStore } from './types/ReduxStore';
import { configureStore } from './store';
import { initialAppState } from './modules/app';
import { initialPlayersState } from './modules/players';
import { initialTeamsState } from './modules/teams';
import { initialTournamentState } from './modules/tournaments';

let store: ReduxStore;
let startedInit = false;

// Will be async in the future
export const initializeApp = (): void => {
    if (startedInit) {
        return;
    }
    startedInit = true;
    const initialState: ReduxState = {
        app: initialAppState,
        players: initialPlayersState,
        teams: initialTeamsState,
        tournaments: initialTournamentState,
    };
    store = configureStore(initialState);
};

export const getStore = async (): Promise<ReduxStore> => {
    await initializeApp();

    if (store) {
        return store;
    }

    throw new Error('Initialization error');
};
