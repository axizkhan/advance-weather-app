import { createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
  units: "metric" | "imperial";
  lang: string;
}

const initialState: PreferencesState = {
  units: "metric",
  lang: "en",
};

const preferencesSlice = createSlice({
  name: "preferences",

  initialState,

  reducers: {
    setUnit: (state, action) => {
      state.units = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setUnit, setLang } = preferencesSlice.actions;

export default preferencesSlice.reducer;
