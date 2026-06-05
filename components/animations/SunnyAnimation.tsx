"use client";

import { motion } from "framer-motion";

export function SunnyAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen select-none">
      {/* Layer 1: Ambient High-Luminance Atmospheric Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-300/10 to-transparent blur-[120px]"
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.4, 0.6, 0.5, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 2: Primary Solar Disk Center */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative flex h-32 w-32 items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Internal Radiance Corona Ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Hard-edged Vector Corona Crown */}
          <motion.svg
            className="h-16 w-16 text-amber-300 drop-shadow-[0_0_32px_rgba(251,191,36,0.6)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="currentColor"
              className="text-yellow-400"
            />
            {/* Symmetrical Sunburst Beam Arrays */}
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Layer 3: Secondary Counter-Rotating Flare Ring */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-overlay">
        <motion.div
          className="h-48 w-48 rounded-full border border-dashed border-yellow-400/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
