import { cn } from "@/utils/cn";

interface Props {
  className?: string;
}

export function Skeleton({ className }: Props) {
  return (
    <div
      className={cn(
        // High-fidelity dark mode loading block matching the weather card profiles
        "animate-pulse rounded-xl border border-[#13223f]/50 bg-[#091225]",
        className,
      )}
    />
  );
}
