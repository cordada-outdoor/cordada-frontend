import { useSyncExternalStore } from "react";

export type CookieConsent = "accepted" | "declined";

const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";

const read = (): CookieConsent | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
  } catch {
    // Storage can be unavailable (private mode); fall through
  }
  // Visitors who clicked the previous react-cookie-consent banner
  if (document.cookie.split("; ").includes("CookieConsent=true")) {
    return "accepted";
  }
  return null;
};

const subscribe = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

export const setCookieConsent = (value: CookieConsent) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Consent then only lasts for this page view
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

// Consent for third-party cookies (Instagram and YouTube embeds)
const useCookieConsent = () => useSyncExternalStore(subscribe, read);

export default useCookieConsent;
