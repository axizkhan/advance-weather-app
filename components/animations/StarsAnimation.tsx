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
    const generatedStars = Array.from({ length: 80 }).map((_, index) => {
      const sizeSeed = Math.random();
      const size = sizeSeed > 0.85 ? 2.5 : sizeSeed > 0.5 ? 1.5 : 1;

      return {
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        duration: 2 + Math.random() * 4,

        delay: Math.random() * -6,
        opacity: 0.3 + Math.random() * 0.7,
      };
    });

    setStars(generatedStars);
  }, []);

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

            boxShadow:
              star.size > 2 ? "0 0 8px rgba(255, 255, 255, 0.8)" : "none",
          }}
          initial={{ opacity: 0.1 }}
          animate={{
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
