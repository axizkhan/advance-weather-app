# Offline Data Handling Strategy

Your weather app now has a complete offline-first architecture. Here's how everything works together:

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER LAYER                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Components (WeatherHero, MetricsGrid, etc)                │
│         ↓                                                   │
│  Query Hooks (useCurrentWeather, useGeoWeather)            │
│         ↓                                                   │
│  TanStack Query (Caching + Deduplication)                  │
│         ↓                                                   │
│  Network Request ─────────────────────┐                    │
│         ↓                              ↓                    │
│  Persister Plugin            ┌──────────────────┐           │
│         ↓                    │   IndexedDB       │           │
│  IndexedDB Cache ────────→  │  (Offline Store)  │           │
│                             └──────────────────┘           │
│         ↓                                                   │
│  Next.js API Route                                          │
│         ↓                                                   │
│  External Weather API                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Scenarios

### Scenario 1: Fresh App Open (Online)

```
User Opens App
    ↓
QueryProvider Renders
    ↓
IndexedDB Check: No data OR data > 60 mins old
    ↓
useQuery Fires
    ↓
API Call → Next.js Route → External API
    ↓
Response Received
    ↓
TanStack Query Cache Updated
    ↓
Persister Saves to IndexedDB
    ↓
Components Re-render with New Data ✅
```

**Result:** Fresh data displayed immediately

---

### Scenario 2: App Open with Cached Data (Online)

```
User Opens App
    ↓
QueryProvider Renders
    ↓
IndexedDB Check: Found recent data
    ↓
Hydrate Query Cache with IndexedDB Data
    ↓
Components Render Immediately ✅
    ↓
Background: useQuery Refetch Triggered
    ↓
API Call Happens in Background
    ↓
New Data Arrives
    ↓
Cache Updated + Persisted
    ↓
Components Re-render Silently (if data changed)
```

**Result:** Instant load with seamless background refresh

---

### Scenario 3: User Loses Internet Mid-Session

```
Fetch Request Fails
    ↓
Retry Twice (queryConfig: retry = 2)
    ↓
Query Marked as Failed
    ↓
Query.error = NetworkError
    ↓
BUT: Query.data Still Has Cached Data
    ↓
Components Check: error && data → Show Cached + "Offline" Badge
    ↓
Users See: Current weather (cached) + "📡 Offline" indicator
    ↓
Manual Refresh Button Available ↻
```

**Result:** Seamless offline fallback - users continue seeing weather

---

### Scenario 4: Internet Returns

```
Network Reconnects
    ↓
window "online" Event Fires
    ↓
refetchOnReconnect: true Triggers
    ↓
All Queries Auto-Refetch in Background
    ↓
New Data Arrives
    ↓
Cache Updates
    ↓
IndexedDB Persister Saves
    ↓
Components Re-render with Fresh Data
    ↓
"Offline" Badge Disappears Automatically
```

**Result:** Automatic fresh data fetch - no user action needed

---

### Scenario 5: App Opened While Offline

```
User Opens App (No Internet)
    ↓
QueryProvider Initializes
    ↓
Persister Restores from IndexedDB
    ↓
Query Cache Hydrated with Old Data
    ↓
useQuery Tries to Fetch
    ↓
Fetch Fails (No Network)
    ↓
Query.error = NetworkError
    ↓
BUT: Query.data From IndexedDB Still Available
    ↓
Components Render: Cached Weather + "Offline" Badge + Timestamp
    ↓
Users See: "Last updated 2h ago • Showing cached data"
```

**Result:** Full weather info from offline cache

---

## Component Implementation Pattern

### Basic Pattern (Recommended)

```typescript
"use client";

import { DataStatus } from "@/components/offline";
import { useCurrentWeather } from "@/hooks/weather/useCurrentWeather";

export function WeatherHero() {
  const query = useCurrentWeather({ lat: -1.3, lon: 36.8 });

  if (query.isLoading && !query.data) {
    return <Skeleton />;
  }

  if (!query.data) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-4">
      {/* Automatic handling of: offline badge, timestamps, refresh button */}
      <DataStatus
        query={query}
        showTimestamp
        showRefreshButton
      />

      {/* Your content always works - data is either fresh or cached */}
      <div>
        <h2>{query.data.current.temperature}°C</h2>
        <p>{query.data.current.condition}</p>
      </div>
    </div>
  );
}
```

### Component States Reference

| State                      | isLoading | error   | data    | Display                |
| -------------------------- | --------- | ------- | ------- | ---------------------- |
| Loading (no cache)         | `true`    | `null`  | `null`  | Skeleton/Spinner       |
| Loaded (success)           | `false`   | `null`  | `{...}` | Fresh Data ✅          |
| Stale (background refetch) | `false`   | `null`  | `{...}` | Cached Data + Badge 🔄 |
| Offline (cached)           | `false`   | `Error` | `{...}` | Cached Data + Badge 📡 |
| Error (no cache)           | `false`   | `Error` | `null`  | Error Message ❌       |

---

## Available Components

### 1. `<OfflineBanner />`

Shows "You're offline" banner at top of app. Only visible when offline.

```typescript
import { OfflineBanner } from "@/components/offline";

export function Layout() {
  return (
    <>
      <OfflineBanner /> {/* Auto-managed */}
      {/* rest of layout */}
    </>
  );
}
```

### 2. `<DataStatus />`

Smart component that shows:

- Loading indicator
- Offline badge + cached data hint
- Last updated timestamp
- Manual refresh button

```typescript
<DataStatus
  query={useCurrentWeather(...)}
  showTimestamp    // Show "2m ago" etc
  showRefreshButton // Show 🔄 Refresh button
/>
```

### 3. `<RefreshButton />`

Manual refresh trigger with loading state.

```typescript
<RefreshButton
  onRefresh={() => query.refetch()}
  isLoading={query.isLoading}
/>
```

### 4. `<DataTimeBadge />`

Shows "last updated X minutes ago" or similar.

```typescript
<DataTimeBadge timestamp={query.dataUpdatedAt} />
// Displays: "2m ago"
```

### 5. `<CachedDataBadge />`

Shows "🔄 Updating..." when data is stale.

```typescript
<CachedDataBadge isStale={data.stale} />
```

### 6. `useNetworkStatus()`

Hook to check if online/offline.

```typescript
const isOnline = useNetworkStatus();

if (!isOnline) {
  // Show offline UI
}
```

---

## Query Configuration

Located in `store/query/queryConfig.ts`:

```typescript
{
  staleTime: 1000 * 60 * 5,    // 5 mins: Data fresh, no refetch
  gcTime: 1000 * 60 * 60,      // 1 hour: Keep in memory
  retry: 2,                     // Retry failed requests 2x
  refetchOnWindowFocus: false,  // Don't refetch on window focus
  refetchOnReconnect: true,     // ⭐ Auto-refetch when online
  refetchInterval: 1000 * 60 * 10, // ⭐ Background refresh every 10 mins
}
```

---

## IndexedDB Storage

Located in `service/storage/indexedDB.ts`:

**Object Stores:**

- `cache` - Full TanStack Query cache (automatic)
- `cities` - Saved favorite cities (for future)
- `preferences` - User preferences (for future)

**Persistence:**

- Happens automatically after every successful query
- IndexedDB Persister plugin handles all saving/loading
- No manual code needed

---

## Key Principles

### ✅ DO:

1. Always check `data` first before checking `error`

   ```typescript
   if (error && data) {
     // Show cached data
   }
   ```

2. Use `<DataStatus />` in most components

   ```typescript
   <DataStatus query={query} showTimestamp showRefreshButton />
   ```

3. Let TanStack Query manage background refreshes
   - Don't manually call refetch in useEffect
   - It's configured automatically

4. Show users when data is offline/stale
   ```typescript
   {isStale && <CachedDataBadge isStale />}
   ```

### ❌ DON'T:

1. Check only `error` - always include data fallback

   ```typescript
   // ❌ Bad
   if (error) return <Error />

   // ✅ Good
   if (error && data) return <Cached />
   ```

2. Manually persist data to localStorage

   ```typescript
   // ❌ Don't do this - use IndexedDB instead
   localStorage.setItem("weather", JSON.stringify(data));
   ```

3. Disable background refresh

   ```typescript
   // ❌ Don't set staleTime to Infinity

   // ✅ Keep reasonable stale time
   staleTime: 1000 * 60 * 5;
   ```

4. Show loading spinner when cached data exists

   ```typescript
   // ❌ Bad
   if (isLoading) return <Skeleton />

   // ✅ Good
   if (isLoading && !data) return <Skeleton />
   ```

---

## Testing Offline Scenarios

### In Browser DevTools:

1. **Go Offline:**
   - DevTools → Network tab → Throttling dropdown → Offline

2. **Simulate Slow Network:**
   - DevTools → Network tab → Throttling dropdown → Slow 3G

3. **Check IndexedDB:**
   - DevTools → Application → IndexedDB → advanced-weather-db

4. **Test Connection Recovery:**
   - Go offline in DevTools
   - Let app try to refetch
   - Switch back to "No throttling"
   - Watch auto-refetch trigger

---

## Troubleshooting

### Issue: Old data showing even after going online

**Solution:**

- Check `refetchOnReconnect: true` is set
- Wait a moment for background refetch

### Issue: IndexedDB not persisting

**Solution:**

- Check browser DevTools → Application → IndexedDB
- Verify `indexedDbPersister` in QueryProvider
- Check `getDb()` is initializing correctly

### Issue: Offline banner not showing

**Solution:**

- Check `<LayoutWrapper>` is in layout.tsx
- Check `<OfflineBanner>` is inside it
- Check `useNetworkStatus()` hook exists

### Issue: Refresh button not working

**Solution:**

- Pass correct `onRefresh` function to `<RefreshButton>`
- Check query object has `refetch` method
- Verify component is marked with `"use client"`

---

## Files Reference

```
hooks/
  └─ useNetworkStatus.ts           ← Track online/offline status

components/offline/
  ├─ OfflineBanner.tsx             ← Shows "you're offline" banner
  ├─ CachedDataBadge.tsx           ← Shows "🔄 Updating..."
  ├─ DataTimeBadge.tsx            ← Shows "2m ago"
  ├─ RefreshButton.tsx            ← Manual refresh button
  ├─ DataStatus.tsx               ← Smart status handler
  ├─ PATTERN.tsx                  ← Copy-paste patterns
  └─ index.ts                     ← Barrel exports

components/layout/
  └─ LayoutWrapper.tsx            ← Wraps layout with OfflineBanner

store/query/
  └─ queryConfig.ts               ← Stale, gc, retry, refetch config

service/storage/
  └─ indexedDB.ts                 ← IndexedDB with multiple stores
  └─ persister.ts                 ← Persister plugin (auto-save)

providers/
  └─ QueryProvider.tsx            ← Sets up persistence
```

---

## Summary

Your offline system works like this:

1. **TanStack Query** handles API requests & caching
2. **IndexedDB Persister** saves cache automatically
3. **Network Status Hook** detects online/offline
4. **Components** show cached data when offline
5. **Background Refetch** updates data when online returns
6. **UI Badges** tell users about cache/offline status

Result: **Fast, offline-capable, always-available weather data** 🎉
