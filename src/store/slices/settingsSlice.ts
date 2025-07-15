import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: {
    primary: string;
    secondary: string;
    background: string;
    job: string;
    routine: string;
    freeTime: string;
  };
  notifications: {
    enabled: boolean;
    minutesBefore: number;
  };
}

const initialState: SettingsState = {
  theme: {
    primary: '#6C63FF',
    secondary: '#FFB347',
    background: '#181A20',
    job: '#6C63FF',
    routine: '#FFB347',
    freeTime: '#FFD166',
  },
  notifications: {
    enabled: true,
    minutesBefore: 10,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeColor(state, action: PayloadAction<{ key: keyof SettingsState['theme'], value: string }>) {
      state.theme[action.payload.key] = action.payload.value;
    },
    setNotificationsEnabled(state, action: PayloadAction<boolean>) {
      state.notifications.enabled = action.payload;
    },
    setMinutesBefore(state, action: PayloadAction<number>) {
      state.notifications.minutesBefore = action.payload;
    },
  },
});

export const { setThemeColor, setNotificationsEnabled, setMinutesBefore } = settingsSlice.actions;
export default settingsSlice.reducer; 