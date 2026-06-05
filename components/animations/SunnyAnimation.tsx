"use client";

import { motion } from "framer-motion";

export function SunnyAnimation() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-500/30 to-blue-300/30 pointer-events-none">
      <motion.div
        className="absolute right-[10%] top-[10%] h-40 w-40 rounded-full bg-yellow-300 shadow-[0_0_100px_rgba(253,224,71,0.6)]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
