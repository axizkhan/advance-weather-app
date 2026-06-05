"use client";

import { motion } from "framer-motion";

export function SnowAnimation() {
  const flakes = Array.from({ length: 70 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-400/40 to-slate-200/40 pointer-events-none">
      {flakes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: -20,
            opacity: Math.random() * 0.8 + 0.2,
            scale: Math.random() * 0.8 + 0.4,
          }}
          animate={{
            y: "100vh",
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
