"use client";

export function CachedDataBadge({ isStale }: { isStale: boolean }) {
  if (!isStale) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
      <span>🔄</span>
      <span>Updating...</span>
    </div>
  );
}
