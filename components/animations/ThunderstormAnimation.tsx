"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

export function ThunderstormAnimation() {
  const controls = useAnimationControls();
  const [isStriking, setIsStriking] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Core recursive sequencer that triggers strikes at unpredictable intervals
    const triggerLightningSequence = async () => {
      setIsStriking(true);

      // Execute a high-fidelity double-strike lightning discharge sequence
      await controls.start({
        opacity: [0, 0.85, 0.1, 0.95, 0],
        transition: {
          duration: 0.45,
          times: [0, 0.15, 0.3, 0.45, 1],
          ease: "linear",
        },
      });

      setIsStriking(false);

      // Schedule the next random atmospheric discharge interval (between 4 to 11 seconds)
      const nextStrikeDelay = 4000 + Math.random() * 7000;
      timeoutId = setTimeout(triggerLightningSequence, nextStrikeDelay);
    };

    // Initialize the storm sequence loop
    timeoutId = setTimeout(triggerLightningSequence, 3000);

    return () => clearTimeout(timeoutId);
  }, [controls]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen select-none">
      {/* Layer 1: The Core Lightning Flash Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-teal-100 via-blue-50 to-transparent"
        initial={{ opacity: 0 }}
        animate={controls}
      />

      {/* Layer 2: Ambient Storm Cloud Rumble Glow */}
      <motion.div
        className="absolute inset-0 bg-violet-900/10 blur-2xl"
        animate={{
          opacity: isStriking ? [0.2, 0.5, 0.2] : [0.1, 0.18, 0.1],
          scale: isStriking ? 1.05 : 1,
        }}
        transition={{
          duration: isStriking ? 0.45 : 4,
          repeat: isStriking ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
