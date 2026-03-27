import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_COOKIE_NAME = "oyana-accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "oyana-refreshToken";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
type AuthCookieSnapshot = {
  accessToken: string | null;
  refreshToken: string | null;
};
type AuthCookieListener = (snapshot: AuthCookieSnapshot) => void;

// In-memory cache for async SecureStore reads
const tokenCache = new Map<string, string>();
let hasLoadedNativeTokens = false;
let nativeTokenLoadPromise: Promise<void> | null = null;
const authCookieListeners = new Set<AuthCookieListener>();

function getAuthCookieSnapshot(): AuthCookieSnapshot {
  return {
    accessToken: getAccessTokenCookie(),
    refreshToken: getRefreshTokenCookie(),
  };
}

function notifyAuthCookieListeners() {
  const snapshot = getAuthCookieSnapshot();
  for (const listener of authCookieListeners) {
    listener(snapshot);
  }
}

function encodeCookieValue(value: string) {
  return encodeURIComponent(value);
}

function decodeCookieValue(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function setBrowserCookie(name: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=${encodeCookieValue(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearBrowserCookie(name: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function readBrowserCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const rawCookie of cookies) {
    const trimmed = rawCookie.trim();
    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex < 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    if (key !== name) {
      continue;
    }

    return decodeCookieValue(trimmed.slice(separatorIndex + 1));
  }

  return null;
}

async function loadNativeTokensIntoCache() {
  if (typeof document !== "undefined" || hasLoadedNativeTokens) {
    return;
  }

  try {
    const accessToken = await SecureStore.getItemAsync(
      ACCESS_TOKEN_COOKIE_NAME,
    );
    const refreshToken = await SecureStore.getItemAsync(
      REFRESH_TOKEN_COOKIE_NAME,
    );

    if (accessToken) tokenCache.set(ACCESS_TOKEN_COOKIE_NAME, accessToken);
    if (refreshToken) tokenCache.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken);

  } catch {
    // Ignore errors during initialization
  } finally {
    hasLoadedNativeTokens = true;
    notifyAuthCookieListeners();
  }
}

export async function ensureAuthCookiesLoaded() {
  if (typeof document !== "undefined" || hasLoadedNativeTokens) {
    return;
  }

  if (!nativeTokenLoadPromise) {
    nativeTokenLoadPromise = loadNativeTokensIntoCache().finally(() => {
      nativeTokenLoadPromise = null;
    });
  }

  await nativeTokenLoadPromise;
}

if (typeof document === "undefined") {
  void ensureAuthCookiesLoaded();
}

function setCookie(name: string, value: string) {
  if (typeof document !== "undefined") {
    setBrowserCookie(name, value);
    notifyAuthCookieListeners();
    return;
  }

  tokenCache.set(name, value);
  hasLoadedNativeTokens = true;
  SecureStore.setItemAsync(name, value).catch(() => {
    // Ignore storage errors
  });
  notifyAuthCookieListeners();
}

function getCookie(name: string) {
  if (typeof document !== "undefined") {
    return readBrowserCookie(name);
  }

  return tokenCache.get(name) ?? null;
}

function clearCookie(name: string) {
  if (typeof document !== "undefined") {
    clearBrowserCookie(name);
    notifyAuthCookieListeners();
    return;
  }

  tokenCache.delete(name);
  hasLoadedNativeTokens = true;
  SecureStore.deleteItemAsync(name).catch(() => {
    // Ignore storage errors
  });
  notifyAuthCookieListeners();
}

export function persistAuthTokens(accessToken: string, refreshToken: string) {
  setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken);
  setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
}

export function clearAuthTokens() {
  clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  clearCookie(REFRESH_TOKEN_COOKIE_NAME);
}

export function getAccessTokenCookie() {
  return getCookie(ACCESS_TOKEN_COOKIE_NAME);
}

export function getRefreshTokenCookie() {
  return getCookie(REFRESH_TOKEN_COOKIE_NAME);
}

export function getAuthCookies() {
  return {
    accessToken: getAccessTokenCookie(),
    refreshToken: getRefreshTokenCookie(),
  };
}

export function subscribeAuthCookieChanges(listener: AuthCookieListener) {
  authCookieListeners.add(listener);
  return () => {
    authCookieListeners.delete(listener);
  };
}

export function buildAuthCookieHeader() {
  const cookieParts: string[] = [];
  const accessToken = getAccessTokenCookie();
  const refreshToken = getRefreshTokenCookie();

  if (accessToken) {
    cookieParts.push(
      `${ACCESS_TOKEN_COOKIE_NAME}=${encodeCookieValue(accessToken)}`,
    );
  }

  if (refreshToken) {
    cookieParts.push(
      `${REFRESH_TOKEN_COOKIE_NAME}=${encodeCookieValue(refreshToken)}`,
    );
  }

  return cookieParts.join("; ");
}
