import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#13223f] bg-[#091225] p-6 text-white shadow-sm transition-all duration-200 hover:border-[#13223f]/80",
        className,
      )}
      {...props}
    />
  );
}
