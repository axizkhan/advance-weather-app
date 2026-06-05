"use client";

import { useIsFetching } from "@tanstack/react-query";

export function useOfflineCache() {
  const isFetching = useIsFetching();

  return {
    syncing: isFetching > 0,
  };
}
