"use client";

import { motion } from "framer-motion";

export function CloudsAnimation() {
  const clouds = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-blue-300/40 to-blue-100/40 pointer-events-none">
      {clouds.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-10 h-20 w-40 rounded-full bg-white/70 blur-[2px]"
          initial={{
            x: "-30vw",
            y: `${Math.random() * 40}%`,
            scale: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: "120vw",
          }}
          transition={{
            duration: Math.random() * 40 + 60,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -60, // Random negative delay to start on screen
          }}
        >
          {/* Cloud fluffy parts */}
          <div className="absolute -top-6 left-6 h-16 w-16 rounded-full bg-white/70" />
          <div className="absolute -top-10 left-16 h-20 w-20 rounded-full bg-white/70" />
          <div className="absolute top-2 left-24 h-14 w-14 rounded-full bg-white/70" />
        </motion.div>
      ))}
    </div>
  );
}
