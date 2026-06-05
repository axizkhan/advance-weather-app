import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  lat: number | null;
  lon: number | null;
  city: string | null;
  country: string | null;
}

const initialState: LocationState = {
  lat: null,
  lon: null,
  city: null,
  country: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ lat: number; lon: number; city?: string; country?: string }>
    ) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      if (action.payload.city) state.city = action.payload.city;
      if (action.payload.country) state.country = action.payload.country;
    },
    clearLocation: (state) => {
      state.lat = null;
      state.lon = null;
      state.city = null;
      state.country = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
