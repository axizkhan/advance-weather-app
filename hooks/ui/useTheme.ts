"use client";

import { useAppSelector } from "@/store/redux/hooks";

export function useTheme() {
  return useAppSelector((state) => state.theme.mode);
}
