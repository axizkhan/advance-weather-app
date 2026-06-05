"use client";

import { motion } from "framer-motion";

export function RainAnimation() {
  const drops = Array.from({ length: 60 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-800/80 pointer-events-none">
      {drops.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-[2px] rounded-full bg-blue-400/60"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: -100,
            height: Math.random() * 30 + 10,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: "100vh",
          }}
          transition={{
            duration: Math.random() * 0.8 + 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
