/**
 * OFFLINE DATA HANDLING PATTERN
 *
 * This file demonstrates the recommended pattern for handling offline data
 * in weather components. Copy this pattern to your components.
 */

"use client";

import { DataStatus } from "@/components/offline/DataStatus";
import { useCurrentWeather } from "@/hooks/weather/useCurrentWeather";

/**
 * PATTERN 1: Minimal - Just show data with status indicator
 */
export function ComponentPattern1() {
  const query = useCurrentWeather({ lat: 0, lon: 0 }); // Replace with real coords

  if (query.isLoading && !query.data) {
    return <div className="p-4">Loading weather...</div>;
  }

  if (!query.data) {
    return <div className="p-4">No weather data available</div>;
  }

  return (
    <div className="space-y-4">
      {/* Show status (connection, timestamps, refresh button) */}
      <DataStatus query={query} showTimestamp showRefreshButton />

      {/* Show your content */}
      <div className="p-4 rounded-lg bg-slate-800">
        <h2>Current: {query.data.current?.temperature}°C</h2>
      </div>
    </div>
  );
}

/**
 * PATTERN 2: Full Control - Handle loading/error/data separately
 */
export function ComponentPattern2() {
  const query = useCurrentWeather({ lat: 0, lon: 0 });
  const { data, isLoading, error, refetch } = query;

  // Loading state - show skeleton
  if (isLoading && !data) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
      </div>
    );
  }

  // Error state but cached data exists
  if (error && data) {
    return (
      <div className="space-y-2">
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
          📡 Offline - Showing cached data
          <button
            onClick={() => refetch()}
            className="ml-2 text-yellow-600 hover:text-yellow-700 underline text-sm"
          >
            Retry
          </button>
        </div>
        <div>{data.current?.temperature}°C</div>
      </div>
    );
  }

  // Fatal error - no data
  if (!data) {
    return <div className="text-red-500">Error loading weather</div>;
  }

  // Success
  return (
    <div>
      <div>{data.current?.temperature}°C</div>
    </div>
  );
}

/**
 * KEY RULES:
 *
 * 1. Always check for data first:
 *    ✅ if (isLoading && !data)
 *    ❌ if (isLoading)
 *
 * 2. Prioritize cached data over errors:
 *    ✅ if (error && data) return <CachedContent />
 *    ❌ if (error) return <Error />
 *
 * 3. Let TanStack Query handle background refresh:
 *    - You don't need to manage refetch interval
 *    - It's configured in queryConfig
 *    - Just call refetch() on manual triggers
 *
 * 4. Show users they're offline:
 *    - Use <DataStatus /> for automatic handling
 *    - Or show manual "offline" badge
 *    - Show timestamp of last update
 *
 * 5. IndexedDB persistence is automatic:
 *    - No code needed
 *    - Data persisted after every successful fetch
 *    - Restored automatically on app load
 */
