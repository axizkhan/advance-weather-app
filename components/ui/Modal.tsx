"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

export function Modal({ open, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-6">{children}</div>
    </div>
  );
}
