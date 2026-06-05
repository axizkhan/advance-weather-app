import { Persister } from "@tanstack/react-query-persist-client";

import { dbPromise } from "./indexedDB";

const STORE_NAME = "cache";

export const indexedDbPersister: Persister = {
  persistClient: async (client) => {
    const db = await dbPromise;

    await db.put(STORE_NAME, client, "react-query");
  },

  restoreClient: async () => {
    const db = await dbPromise;

    return db.get(STORE_NAME, "react-query");
  },

  removeClient: async () => {
    const db = await dbPromise;
    await db.delete(STORE_NAME, "react-query");
  },
};
