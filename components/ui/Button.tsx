import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-2xl px-5 py-3 font-medium transition-all",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-white/10 backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}
