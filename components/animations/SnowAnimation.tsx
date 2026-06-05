"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SnowFlake {
  id: number;
  left: string;
  duration: number;
  delay: number;
  opacity: number;
  size: number;
  // Unique horizontal drift array offsets for custom swaying paths
  swayRange: string[];
}

export function SnowAnimation() {
  const [flakes, setFlakes] = useState<SnowFlake[]>([]);

  useEffect(() => {
    // Generate snowflake data models safely after the client engine mounts
    const generatedFlakes = Array.from({ length: 45 }).map((_, index) => {
      const initialLeft = Math.random() * 100;
      // Define a localized oscillating boundary window so particles drift back and forth instead of running away
      const driftOffset = 4 + Math.random() * 6;

      return {
        id: index,
        left: `${initialLeft}%`,
        duration: 7 + Math.random() * 6, // Slow, floating descent times
        delay: Math.random() * -10, // Pre-warms the layout canvas instantly on load
        opacity: 0.2 + Math.random() * 0.6,
        size: 3 + Math.random() * 5, // Varied particle dimensions
        swayRange: [
          `${initialLeft}%`,
          `${initialLeft + driftOffset}%`,
          `${initialLeft - driftOffset}%`,
          `${initialLeft}%`,
        ],
      };
    });

    setFlakes(generatedFlakes);
  }, []);

  if (flakes.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen select-none">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white blur-[0.5px]"
          style={{
            height: `${flake.size}px`,
            width: `${flake.size}px`,
            opacity: flake.opacity,
            left: 0, // Reset default left configuration to let the keyframe array handle positioning
          }}
          initial={{ y: "-10vh" }}
          animate={{
            y: "110vh",
            x: flake.swayRange, // Orchestrates organic side-to-side shifting
          }}
          transition={{
            y: {
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: flake.duration * 0.5, // Sway faster than the fall speed to look organic
              delay: flake.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
}
