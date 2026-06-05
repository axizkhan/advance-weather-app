"use client";

import { openDB } from "idb";

let dbPromise: ReturnType<typeof openDB> | null = null;

export async function getDb() {
  if (typeof window === "undefined") {
    throw new Error("Database can only be accessed in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB("advanced-weather-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("cache"))
          db.createObjectStore("cache");
      },
    });
  }

  return dbPromise;
}
