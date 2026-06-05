"use client";

import { useState } from "react";

interface RefreshButtonProps {
  onRefresh: () => Promise<any>;
  isLoading?: boolean;
  className?: string;
}

export function RefreshButton({
  onRefresh,
  isLoading = false,
  className = "",
}: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClick = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isRefreshing}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="Refresh data"
    >
      <span className={isRefreshing ? "animate-spin" : ""}>🔄</span>
      <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
    </button>
  );
}
