"use client";

import { QueryObserverResult } from "@tanstack/react-query";
import { CachedDataBadge } from "@/components/offline/CachedDataBadge";
import { RefreshButton } from "@/components/offline/RefreshButton";
import { DataTimeBadge } from "@/components/offline/DataTimeBadge";

interface DataStatusProps {
  query: Pick<
    QueryObserverResult,
    "data" | "isLoading" | "error" | "refetch" | "dataUpdatedAt"
  >;
  showTimestamp?: boolean;
  showRefreshButton?: boolean;
}

/**
 * DataStatus component handles the display of:
 * - Loading state
 * - Error state with cached data fallback
 * - Stale data indicator
 * - Manual refresh button
 * - Last updated timestamp
 *
 * Usage in a component:
 * ```
 * const query = useCurrentWeather();
 *
 * return (
 *   <div>
 *     <DataStatus
 *       query={query}
 *       showTimestamp
 *       showRefreshButton
 *     />
 *     {query.data && <YourContent data={query.data} />}
 *   </div>
 * );
 * ```
 */
export function DataStatus({
  query,
  showTimestamp = true,
  showRefreshButton = true,
}: DataStatusProps) {
  const { data, isLoading, error, refetch, dataUpdatedAt } = query;

  // Loading and no cached data
  if (isLoading && !data) {
    return <div className="text-sm text-gray-500">Loading data...</div>;
  }

  // Error but cached data exists (offline scenario)
  if (error && data) {
    return (
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-yellow-600">📡 No connection</span>
          <span className="text-xs text-gray-500">showing cached data</span>
        </div>

        <div className="flex items-center gap-2">
          {showTimestamp && dataUpdatedAt && (
            <DataTimeBadge timestamp={dataUpdatedAt} />
          )}
          {showRefreshButton && (
            <RefreshButton onRefresh={refetch} isLoading={isLoading} />
          )}
        </div>
      </div>
    );
  }

  // No data and error (fatal scenario)
  if (!data && error) {
    return <div className="text-sm text-red-500">❌ Unable to load data</div>;
  }

  // Success case - show updating badge if stale
  if (data) {
    // Data is stale if more than staleTime (5 mins in queryConfig)
    const isStale = dataUpdatedAt
      ? Date.now() - dataUpdatedAt > 1000 * 60 * 5
      : false;

    return (
      <div className="flex items-center gap-2 md:gap-4">
        {isStale && <CachedDataBadge isStale={true} />}
        {showTimestamp && dataUpdatedAt && (
          <DataTimeBadge timestamp={dataUpdatedAt} />
        )}
        {showRefreshButton && (
          <RefreshButton onRefresh={refetch} isLoading={isLoading} />
        )}
      </div>
    );
  }

  return null;
}
