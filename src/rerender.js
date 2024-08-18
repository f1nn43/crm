import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Routes, BrowserRouter} from 'react-router-dom';

const rerender = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    return (
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App rerender={rerender} />
                </BrowserRouter>
            </React.StrictMode>
        )
    )
}

export default rerender