"use client";

import React from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { queryClient } from "@/store/query/queryClient";
import { indexedDbPersister } from "@/service/storage/persister";

type Props = {
  children: React.ReactNode;
};
function QueryProvider({ children }: Props) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: indexedDbPersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

export default QueryProvider;
