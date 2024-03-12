import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SessionStorage = {
  set(key: string, value: unknown) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    if (typeof window !== 'undefined') {
      // Perform sessionStorage action
      const value = sessionStorage.getItem(key) || '';
      if (value) {
        return JSON.parse(value);
      }
    }
  },
  remove(key: string) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  }
};
