"use client";

import { motion } from "framer-motion";

export function CloudsAnimation() {
  // Explicit structural matrix to create organic variation in height, scale, and depth speed
  const cloudProfiles = [
    { y: "10%", scale: 1.0, opacity: 0.12, duration: 55, delay: 0 },
    { y: "25%", scale: 1.4, opacity: 0.08, duration: 75, delay: -15 },
    { y: "45%", scale: 0.8, opacity: 0.15, duration: 45, delay: -5 },
    { y: "60%", scale: 1.8, opacity: 0.05, duration: 95, delay: -30 },
    { y: "75%", scale: 1.1, opacity: 0.1, duration: 65, delay: -20 },
    { y: "90%", scale: 1.5, opacity: 0.07, duration: 85, delay: -10 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen select-none">
      {cloudProfiles.map((cloud, index) => (
        <motion.div
          key={index}
          className="absolute h-36 w-80 rounded-full bg-gradient-to-r from-white/20 via-white/10 to-transparent blur-[64px]"
          style={{
            top: cloud.y,
            left: 0,
          }}
          initial={{
            x: "-40vw",
            scale: cloud.scale,
            opacity: 0,
          }}
          animate={{
            x: "130vw",
            // Smoothly transitions opacity into view as it moves on screen, preventing clipping at boundaries
            opacity: [0, cloud.opacity, cloud.opacity, 0],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
