"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

export function Modal({ open, children }: Props) {
  if (!open) return null;

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[#030914]/80 p-4 backdrop-blur-md">
      {/* Backdrop Dimmer Layout Wrapper */}
      <div
        className="w-full max-w-lg rounded-xl border border-[#13223f] bg-[#091225] p-6 text-white shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
