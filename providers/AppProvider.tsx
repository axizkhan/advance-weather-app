"use client";
import React from "react";
import QueryProvider from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";

type Props = {
  children: React.ReactNode;
};

function AppProvider({ children }: Props) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}

export default AppProvider;
