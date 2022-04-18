import { AppState } from '../../types/AppState';

export const initialAppState: AppState = {
    version: process.env.REACT_APP_VERSION,
};

export const app = (state: AppState = initialAppState): AppState => state;
