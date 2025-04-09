import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
