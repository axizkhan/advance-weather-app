"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RainDrop {
  id: number;
  left: string;
  duration: number;
  delay: number;
  opacity: number;
  height: number;
}

export function RainAnimation() {
  const [droplets, setDroplets] = useState<RainDrop[]>([]);

  useEffect(() => {
    // Generate rain drop matrices strictly on the client side to avoid server-side variance
    const generatedDrops = Array.from({ length: 65 }).map((_, index) => ({
      id: index,
      // Evenly distribute droplets across horizontal screen axes
      left: `${Math.random() * 100}%`,
      // Create random downward velocity vectors
      duration: 0.6 + Math.random() * 0.5,
      // Offset starting loops to scatter stream arrivals
      delay: Math.random() * -2, // Negative delay pre-warms rain track on initial load
      // Layer depth opacities
      opacity: 0.15 + Math.random() * 0.35,
      // Vary droplet length dimensions
      height: 12 + Math.random() * 16,
    }));

    setDroplets(generatedDrops);
  }, []);

  if (droplets.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen select-none">
      {droplets.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-[1.5px] rounded-full bg-gradient-to-b from-blue-200/60 to-transparent"
          style={{
            left: drop.left,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            // Skew transformation slants droplets slightly to simulate an active, windy rainstorm
            transform: "rotate(12deg)",
          }}
          initial={{ y: "-10vh" }}
          animate={{ y: "110vh" }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
