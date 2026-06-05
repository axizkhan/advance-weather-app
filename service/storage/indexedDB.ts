"use client";
import { openDB } from "idb";

export const dbPromise = openDB("advanced-weather-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("cache")) db.createObjectStore("cache");
  },
});
