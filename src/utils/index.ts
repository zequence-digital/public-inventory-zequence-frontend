export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const channelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
export const channelSecret = process.env.NEXT_PUBLIC_CHANNEL_SECRET;

export const tokenKey = "token";

export const user = "user";

export function getFromLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}

export function setToLocalStorage(key: string, value: any): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}
