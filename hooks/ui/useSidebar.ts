"use client";

import { useAppSelector, useAppDispatch } from "@/store/redux/hooks";

import { toggleSidebar } from "@/store/redux/slices/uiSlice";
import { constrainedMemory } from "process";

export function useSidebar() {
  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return {
    isSidebarOpen,
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
}
