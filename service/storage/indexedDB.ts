"use client";

import { openDB } from "idb";

let dbPromise: ReturnType<typeof openDB> | null = null;

export async function getDb() {
  if (typeof window === "undefined") {
    throw new Error("Database can only be accessed in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB("advanced-weather-db", 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("cache")) {
          db.createObjectStore("cache");
        }
        if (!db.objectStoreNames.contains("cities")) {
          db.createObjectStore("cities", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("preferences")) {
          db.createObjectStore("preferences");
        }
      },
    });
  }

  return dbPromise;
}
