import { cn } from "@/utils/cn";

interface Props {
  className?: string;
}

export function Skeleton({ className }: Props) {
  return <div className={cn("animate-pulse rounded-2xl bg-white/10", className)} />;
}
