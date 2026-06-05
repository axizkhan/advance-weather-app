"use client";

import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ className, ...props }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        // High-fidelity frosted container mimicking the floating weather pills
        "rounded-xl border border-[#13223f]/60 bg-[#091225]/40 p-4 text-white shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-[#13223f]/90",
        className,
      )}
      {...(props as any)}
    />
  );
}
