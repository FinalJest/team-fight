import { ReduxState } from './modules';
import { ReduxStore } from './types/ReduxStore';
import { configureStore } from './store';

let store: ReduxStore;
let startedInit = false;

// Will be async in the future
export const initializeApp = (): void => {
    if (startedInit) {
        return;
    }
    startedInit = true;
    const initialState: ReduxState = {
        teams: {
            list: [],
        },
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
