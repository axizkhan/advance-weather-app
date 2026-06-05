"use client";

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030914] select-none">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-full bg-[#fdb813]/10 blur-xl" />

        <svg
          className="h-14 w-14 text-[#fdb813] drop-shadow-[0_0_15px_rgba(253,184,19,0.45)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      </div>

      <div className="mb-8 flex flex-col items-center gap-1.5 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Weather<span className="text-[#1bf8c3]">AI</span>
        </h2>
        <p className="text-[10px] font-bold tracking-[0.18em] text-[#7c8ba1] uppercase">
          Geo Intelligence Platform
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-[#13223f]">
          <div className="animate-infinite-loading h-full w-full origin-left rounded-full bg-[#1bf8c3]" />
        </div>

        <span className="text-[11px] font-semibold tracking-[0.12em] text-[#7c8ba1] uppercase">
          Initializing
        </span>
      </div>
    </div>
  );
}
