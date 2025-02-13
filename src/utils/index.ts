export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const channelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
export const channelSecret = process.env.NEXT_PUBLIC_CHANNEL_SECRET;
export const googleClientId =
  "370629286933-afd9d7e65ettgp4q95i7t1ugllvj2an9.apps.googleusercontent.com";

export const tokenKey = "token";

export const user = "user";

export function getFromLocalStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

export function setToLocalStorage(key: string, value: any) {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {
    return null;
  }
}

export function removeFromLocalStorage(key: string) {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
}
