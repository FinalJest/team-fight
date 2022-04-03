import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
