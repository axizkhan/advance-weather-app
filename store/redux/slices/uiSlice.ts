import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;

  searchModalOpen: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,

  searchModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    toggleSearchModal: (state) => {
      state.searchModalOpen = !state.searchModalOpen;
    },
  },
});

export const { toggleSidebar, toggleSearchModal } = uiSlice.actions;

export default uiSlice.reducer;
