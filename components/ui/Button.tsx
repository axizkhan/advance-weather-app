import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        // Base structure matching the tight, sleek pill elements
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 select-none focus:outline-none disabled:pointer-events-none disabled:opacity-50",

        // Primary Variant: The Electric Mint Pill
        variant === "primary" &&
          "bg-[#1bf8c3] text-[#030914] hover:bg-[#1bf8c3]/90 hover:shadow-[0_0_20px_rgba(27,248,195,0.35)] active:scale-[0.98]",

        // Secondary Variant: The Deep Border/Doc Pill
        variant === "secondary" &&
          "border border-[#13223f] bg-[#091225]/40 text-white hover:border-[#7c8ba1]/30 hover:bg-[#091225]/80 active:scale-[0.98]",

        className,
      )}
      {...props}
    />
  );
}
