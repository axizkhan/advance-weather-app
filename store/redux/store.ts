import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import preferencesReducer from "./slices/preferenceSlice";
import navigationSlice from "./slices/navigationSlice";
import settingSlice from "./slices/settingSlice";
import locationReducer from "./slices/locationSlice";
import citiesReducer from "./slices/citiesSlice";
import {
  persistenceMiddleware,
  loadPersistedState,
} from "./middleware/persistenceMiddleware";

const rootReducer = combineReducers({
  theme: themeReducer,
  ui: uiReducer,
  preferences: preferencesReducer,
  setting: settingSlice,
  navigation: navigationSlice,
  location: locationReducer,
  cities: citiesReducer,
});

const preloadedState = loadPersistedState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
