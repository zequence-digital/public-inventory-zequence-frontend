export function useGoogleRedirect() {
  let pathname;
  if (typeof window !== "undefined") {
    pathname = window.location.origin + "/auth/complete-registration";
  }

  return { pathname };
}
