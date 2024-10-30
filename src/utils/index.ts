import APIBaseUrl from "@/config.json";

export const baseUrl = APIBaseUrl.API_BASE_URL;
export const channelId = APIBaseUrl.CHANNEL_ID;
export const channelSecret = APIBaseUrl.CHANNEL_SECRET;

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
