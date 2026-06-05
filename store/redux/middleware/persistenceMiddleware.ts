import { Middleware } from "@reduxjs/toolkit";

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  try {
    // Only persist essential slices to avoid blowing up localStorage quota
    const persistedState = {
      preferences: state.preferences,
      location: state.location,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("weather-app-state", JSON.stringify(persistedState));
    }
  } catch (e) {
    console.error("Could not persist state to localStorage", e);
  }

  return result;
};

// We also need a way to rehydrate the store on load
export const loadPersistedState = () => {
  try {
    if (typeof window === "undefined") return undefined;
    
    const serializedState = localStorage.getItem("weather-app-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
