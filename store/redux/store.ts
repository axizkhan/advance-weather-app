import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import preferencesReducer from "./slices/preferenceSlice";
import navigationSlice from "./slices/navigationSlice";
import settingSlice from "./slices/settingSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    preferences: preferencesReducer,
    setting: settingSlice,
    navigation: navigationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
