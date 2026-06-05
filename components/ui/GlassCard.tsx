import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl",
        className
      )}
      {...props}
    />
  );
}
