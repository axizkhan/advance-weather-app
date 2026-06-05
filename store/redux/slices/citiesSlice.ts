import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface CitiesState {
  savedCities: City[];
}

const initialState: CitiesState = {
  savedCities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      if (!state.savedCities.find((c) => c.id === action.payload.id)) {
        state.savedCities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.savedCities = state.savedCities.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCity, removeCity } = citiesSlice.actions;

export default citiesSlice.reducer;
