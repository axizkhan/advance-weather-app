import { createSlice } from "@reduxjs/toolkit";

interface NavigationState {
  activeRoute: string;
}

const initialState: NavigationState = {
  activeRoute: "/",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
  },
});

export const { setActiveRoute } = navigationSlice.actions;

export default navigationSlice.reducer;
