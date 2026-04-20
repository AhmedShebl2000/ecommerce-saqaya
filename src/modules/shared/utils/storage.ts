/**
 * Storage utilities
 *
 * Wraps browser localStorage read, write, and remove operations
 * to keep persistence logic reusable and isolated from stores.
 *
 * Responsibilities:
 *  - serialize and persist values
 *  - deserialize stored values safely
 *  - remove persisted keys when needed
 */
export function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
