import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { getStore } from './init';

const container = document.getElementById('root');
getStore().then((store) => {
    if (container) {
        const root = createRoot(container);
        root.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>,
        );
    }
});
