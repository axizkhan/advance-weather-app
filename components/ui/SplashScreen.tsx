"use client";

import { motion } from "framer-motion";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030914] select-none">
      {/* 1. Central Sun Component: Soft scale-in bounce + continuous subtle pulse/spin combination */}
      <motion.div
        className="relative mb-6 flex h-20 w-20 items-center justify-center"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        {/* Breathing Halo Glow Background Ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#fdb813]/10 blur-xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sun Vector Illustration Layer */}
        <motion.svg
          className="h-14 w-14 text-[#fdb813] drop-shadow-[0_0_20px_rgba(253,184,19,0.55)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
        </motion.svg>
      </motion.div>

      {/* 2. App Identity Text Stack: Slides upward into position smoothly */}
      <motion.div
        className="mb-8 flex flex-col items-center gap-1.5 text-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Weather<span className="text-[#1bf8c3]">AI</span>
        </h1>
        <p className="text-[10px] font-bold tracking-[0.18em] text-[#7c8ba1] uppercase">
          Geo Intelligence Platform
        </p>
      </motion.div>

      {/* 3. Loading Gauge Component: Smooth fluid entry along with infinite back-and-forth loading sweep */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {/* Track Lane Backdrop Frame */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-[#13223f]">
          {/* Active Progress Fill Bar */}
          <motion.div
            className="h-full rounded-full bg-[#1bf8c3]"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "60%" }} // Sets thickness proportion for the sweeping segment loop
          />
        </div>

        {/* Soft Breathing Status Text */}
        <motion.span
          className="text-[11px] font-semibold tracking-[0.12em] text-[#7c8ba1] uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          Initializing
        </motion.span>
      </motion.div>
    </div>
  );
}
