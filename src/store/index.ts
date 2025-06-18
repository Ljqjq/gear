import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 