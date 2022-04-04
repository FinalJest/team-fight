import { createStore } from 'redux';
import { ReduxState, rootReducer } from '../modules';
import { ReduxStore } from '../types/ReduxStore';

export const configureStore = (
    initialState: Partial<ReduxState> = {},
): ReduxStore => createStore(
    rootReducer,
    initialState,
);
