import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import dataReducer from './dataSlice';

// Load from localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) return undefined;
        return { user: JSON.parse(serializedState) };
    } catch (e) {
        console.warn("Could not load from localStorage", e);
        return undefined;
    }
};

// Save to localStorage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state.user);
        localStorage.setItem('userState', serializedState);
    } catch (e) {
        console.warn("Could not save to localStorage", e);
    }
};

const store = configureStore({
    reducer: {
        user: userReducer,
        dashboard: dataReducer,
    },
    preloadedState: loadFromLocalStorage(),
});

// Subscribe to store updates
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;