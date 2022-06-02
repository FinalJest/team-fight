import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReduxState, rootReducer } from '../modules';
import { ReduxStore } from '../types/ReduxStore';

export const configureStore = (
    initialState: Partial<ReduxState> = {},
): ReduxStore => createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
);
