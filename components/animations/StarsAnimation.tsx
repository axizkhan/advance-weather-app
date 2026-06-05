"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function StarsAnimation() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate star coordinates strictly after mounting on the client to preserve hydration parity
    const generatedStars = Array.from({ length: 80 }).map((_, index) => {
      // Proportional chance weighting to make smaller stars more frequent than larger ones (creates depth)
      const sizeSeed = Math.random();
      const size = sizeSeed > 0.85 ? 2.5 : sizeSeed > 0.5 ? 1.5 : 1;

      return {
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        duration: 2 + Math.random() * 4,
        // Negative delay mixes up the initial cycle point so they don't all start fading at the exact same fraction of a second
        delay: Math.random() * -6,
        opacity: 0.3 + Math.random() * 0.7,
      };
    });

    setStars(generatedStars);
  }, []);

  // Return a stable empty tree during server rendering and hydration matching
  if (stars.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen select-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            height: `${star.size}px`,
            width: `${star.size}px`,
            // Inject a subtle glow around the rare, larger magnitude stars
            boxShadow:
              star.size > 2 ? "0 0 8px rgba(255, 255, 255, 0.8)" : "none",
          }}
          initial={{ opacity: 0.1 }}
          animate={{
            // Smooth natural twinkling keyframes
            opacity: [0.1, star.opacity, 0.2, star.opacity * 0.8, 0.1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
