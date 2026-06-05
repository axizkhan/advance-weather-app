import { createSlice } from "@reduxjs/toolkit";

interface SettingState {
  notification: boolean;
  autoRefresh: boolean;
}

const initialState: SettingState = {
  notification: true,
  autoRefresh: true,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleNotification: (state) => {
      state.notification = !state.notification;
    },
    toggleAutoRefresh: (state) => {
      state.autoRefresh = !state.autoRefresh;
    },
  },
});

export const { toggleNotification, toggleAutoRefresh } = settingSlice.actions;

export default settingSlice.reducer;
