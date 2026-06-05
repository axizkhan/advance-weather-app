"use client";

export function DataTimeBadge({
  timestamp,
}: {
  timestamp?: Date | number | null;
}) {
  if (!timestamp) return null;

  const now = new Date();
  const timestampMs =
    timestamp instanceof Date ? timestamp.getTime() : timestamp;
  const diff = now.getTime() - timestampMs;

  // Convert to minutes
  const minutes = Math.floor(diff / 1000 / 60);

  if (minutes < 1)
    return <span className="text-xs text-gray-500">just now</span>;
  if (minutes < 60)
    return <span className="text-xs text-gray-500">{minutes}m ago</span>;

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return <span className="text-xs text-gray-500">{hours}h ago</span>;

  const days = Math.floor(hours / 24);
  return <span className="text-xs text-gray-500">{days}d ago</span>;
}
