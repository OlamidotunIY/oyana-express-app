import { setContext } from "@apollo/client/link/context";
import {
  buildAuthCookieHeader,
  ensureAuthCookiesLoaded,
  getAccessTokenCookie,
} from "@/lib/auth-cookies";

export const authLink = setContext(async (_, { headers }) => {
  await ensureAuthCookiesLoaded();

  const accessToken = getAccessTokenCookie();
  const cookieHeader = buildAuthCookieHeader();
  const version = process.env.EXPO_PUBLIC_APP_VERSION ?? "mobile-unknown";

  return {
    headers: {
      ...headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      "x-oyana-client-platform": "mobile",
      "x-oyana-client-version": version,
    },
  };
});
