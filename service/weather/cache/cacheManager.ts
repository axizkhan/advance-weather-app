export function isCacheExpired(timestamp: number, expirey: number) {
  return Date.now() - timestamp > expirey;
}
