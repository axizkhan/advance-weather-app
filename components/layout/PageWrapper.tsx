"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

export function PageWrapper({ children }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="animate-fade-in relative z-10 mx-auto w-full max-w-[1280px] flex-1 px-4 py-10 md:px-6 md:py-16 lg:py-20"
    >
      {children}
    </motion.main>
  );
}
