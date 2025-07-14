import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  selectedDate: string; // ISO string
}

const initialState: UIState = {
  selectedDate: new Date().toISOString(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = uiSlice.actions;
export default uiSlice.reducer; 