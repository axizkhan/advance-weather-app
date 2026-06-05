import { createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
  units: "metric" | "imperial";
}

const initialState: PreferencesState = {
  units: "metric",
};

const preferencesSlice = createSlice({
  name: "preferences",

  initialState,

  reducers: {
    setUnit: (state, action) => {
      state.units = action.payload;
    },
  },
});

export const { setUnit } = preferencesSlice.actions;

export default preferencesSlice.reducer;
