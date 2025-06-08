import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../components/Event';

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
      const newEvent: Event = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.events.push(newEvent);
    },
    toggleEvent: (state, action: PayloadAction<string>) => {
      const event = state.events.find((event) => event.id === action.payload);
      if (event) {
        event.completed = !event.completed;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
});

export const { addEvent, toggleEvent, deleteEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer; 