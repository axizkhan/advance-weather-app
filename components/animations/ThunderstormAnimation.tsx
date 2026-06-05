"use client";

import { motion } from "framer-motion";

export function ThunderstormAnimation() {
  const drops = Array.from({ length: 80 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-gray-900/90 to-black/90 pointer-events-none">
      {/* Lightning Flash */}
      <motion.div
        className="absolute inset-0 z-10 mix-blend-overlay bg-white"
        animate={{
          opacity: [0, 0, 0, 0.8, 0, 0.4, 0, 0, 0, 0, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 3,
        }}
      />

      {/* Rain drops */}
      {drops.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-[2px] rounded-full bg-blue-300/50"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: -100,
            height: Math.random() * 40 + 20,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: "100vh",
            x: `calc(${Math.random() * 100}vw - 50px)`, // wind effect
          }}
          transition={{
            duration: Math.random() * 0.4 + 0.3, // faster rain
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
