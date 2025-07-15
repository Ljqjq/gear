import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import settingsReducer from './slices/settingsSlice';
import todoReducer from './slices/todoSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    events: eventReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 