"use client";

import { OfflineBanner } from "@/components/offline/OfflineBanner";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OfflineBanner />
      {children}
    </>
  );
}
