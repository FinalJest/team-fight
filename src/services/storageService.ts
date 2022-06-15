import { ReduxState } from '../modules';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

export const getLocalStorageState = (): ReduxState | null => {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!item) {
        return null;
    }

    try {
        return JSON.parse(item) as ReduxState;
    } catch {
        return null;
    }
};

export const resetLocalStorage = (): void => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
};
