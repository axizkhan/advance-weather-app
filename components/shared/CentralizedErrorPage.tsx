"use client";

import { useState } from "react";
import { ERROR_PROFILES } from "@/config/errorProfiles";

interface Props {
  /** Error identifier used to extract visual configurations from your profile map */
  code?: keyof typeof ERROR_PROFILES | string;
  /** Pass down raw runtime exception properties to expose deep diagnostic metrics */
  errorInstance?: Error;
  /** Optional fallback reset trigger provided by Next.js or state orchestrators */
  resetAction?: () => void;
}

export function CentralizedErrorPage({
  code,
  errorInstance,
  resetAction,
}: Props) {
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Fall back gracefully if the provided code is not registered in our core config matrix
  const profile = ERROR_PROFILES[code as string] || ERROR_PROFILES.DEFAULT;

  // Derive contextual accent color indicators safely based on severity ranks
  const severityStyles = {
    low: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/5",
      text: "text-blue-400",
    },
    medium: {
      border: "border-orange-500/20",
      bg: "bg-orange-500/5",
      text: "text-orange-400",
    },
    critical: {
      border: "border-red-500/20",
      bg: "bg-red-500/5",
      text: "text-red-400",
    },
  }[profile.severity];

  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center p-4 select-none sm:p-6 md:p-8">
      {/* Outer Card Shell with dynamic border and glass backdrop layering */}
      <div
        className={`relative w-full max-w-xl rounded-2xl border ${severityStyles.border} bg-[#0c1220]/60 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 md:p-10`}
      >
        {/* Dynamic Background Flare Glow Accent */}
        <div
          className={`pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full opacity-10 blur-[60px] transition-colors duration-500 ${
            profile.severity === "critical"
              ? "bg-red-500"
              : profile.severity === "medium"
                ? "bg-orange-500"
                : "bg-blue-500"
          }`}
        />

        {/* Header Block Array Layout */}
        <div className="flex flex-col items-center text-center">
          {/* Dynamic Vector Icon Canvas Container */}
          <div
            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${severityStyles.bg} ${severityStyles.text} shadow-inner`}
          >
            {profile.iconType === "satellite" && (
              <svg
                className="h-7 w-7 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2m4-3.5v.5a1.5 1.5 0 01-1.5 1.5H18a2 2 0 00-2 2v4.757c0 .11-.042.214-.117.292l-2.182 2.182a.5.5 0 01-.613.048l-.397-.267a.5.5 0 00-.416-.067l-1.428.414a.5.5 0 01-.58-.28l-.348-.781A.5.5 0 009 17.41V17a2 2 0 01-2-2v-1a2 2 0 00-2-2H3m19-2A9 9 0 113 12a9 9 0 0119 0z"
                />
              </svg>
            )}
            {profile.iconType === "signal" && (
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a13.916 13.916 0 00-3.143-8.44l-.054-.09M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.04l-.054.09A13.916 13.916 0 0115 11c0 3.147.786 6.11 2.176 8.705l.054.09M9 11a3 3 0 116 0 3 3 0 01-6 0z"
                />
              </svg>
            )}
            {profile.iconType === "shield" && (
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m0 0v2m0-2h2m-2 0H10m3.478-4.904l3.06-4.823a1 1 0 00-.115-1.258l-.12-.12a1 1 0 00-1.414.018l-5.117 5.116a1 1 0 00-.288.652L9 13.5a1 1 0 001.218.974l1.637-.327a1 1 0 00.596-.345z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            )}
            {profile.iconType === "search" && (
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>

          {/* Subtitle Utility Tag Badge */}
          <span className="inline-flex items-center rounded-full border border-[#13223f] bg-[#13223f]/50 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#7c8ba1] uppercase">
            {profile.subtitle}
          </span>

          {/* Primary Text Headers */}
          <h1 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
            {profile.title}
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-relaxed font-medium text-[#7c8ba1]">
            {profile.message}
          </p>
        </div>

        {/* Action Button Navigation Triggers */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          {resetAction ? (
            /* Primary Retry Call-To-Action Button */
            <button
              onClick={() => resetAction()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1bf8c3] to-[#12c499] px-5 py-3 text-xs font-extrabold tracking-wider text-slate-950 uppercase shadow-lg shadow-[#1bf8c3]/10 transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18"
                />
              </svg>
              Re-Establish Feed
            </button>
          ) : (
            /* Alternate Home Redirect Button */
            <a
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 px-5 py-3 text-xs font-extrabold tracking-wider text-slate-950 uppercase shadow-lg transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Return to Core Dashboard
            </a>
          )}

          {/* Dynamic Technical Diagnostic Dropdown Toggle */}
          {(errorInstance || code) && (
            <button
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#13223f] bg-[#030914]/40 px-5 py-3 text-xs font-bold tracking-wider text-[#7c8ba1] uppercase transition-colors hover:bg-[#13223f]/30 sm:w-auto"
            >
              Diagnostics
              <svg
                className={`h-3.5 w-3.5 transform transition-transform duration-200 ${showDiagnostics ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Dynamic Diagnostics Stack Trace Drawer Area */}
        {showDiagnostics && (
          <div className="mt-6 max-h-48 scrollbar-thin scrollbar-thumb-[#13223f] overflow-hidden overflow-y-auto rounded-xl border border-[#13223f]/40 bg-[#030914]/80 p-4 font-mono text-[11px] leading-relaxed text-[#7c8ba1]/90 shadow-inner">
            <div className="mb-2 flex flex-col gap-1 text-[#1bf8c3]/80">
              <span className="font-bold">
                STATUS_CODE:{" "}
                <span className="text-white">{code || "UNKNOWN"}</span>
              </span>
              <span className="font-bold">
                TIMESTAMP:{" "}
                <span className="text-white">{new Date().toISOString()}</span>
              </span>
            </div>
            <hr className="my-2 border-[#13223f]/30" />
            <p className="break-all whitespace-pre-wrap text-slate-300">
              {errorInstance?.stack ||
                errorInstance?.message ||
                "No stack trace generated by execution interceptor."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
