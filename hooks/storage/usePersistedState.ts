"use client";

import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);

    if (item) {
      setState(JSON.parse(item));
    }
  });

  const setPersisted = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setPersisted] as const;
}
