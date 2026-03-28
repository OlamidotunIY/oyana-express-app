function normalizeGraphqlUrl(value?: string | null) {
  const normalized = value?.trim();
  if (!normalized) {
    return null;
  }

  const withoutTrailingSlash = normalized.replace(/\/+$/, "");
  if (withoutTrailingSlash.endsWith("/graphql")) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/graphql`;
}

function deriveWsUrl(httpUrl: string | null) {
  if (!httpUrl) {
    return null;
  }

  if (httpUrl.startsWith("https://")) {
    return `wss://${httpUrl.slice("https://".length)}`;
  }

  if (httpUrl.startsWith("http://")) {
    return `ws://${httpUrl.slice("http://".length)}`;
  }

  return null;
}

export const HTTP_URL = normalizeGraphqlUrl(process.env.EXPO_PUBLIC_API_URL);
export const WS_URL =
  normalizeGraphqlUrl(process.env.EXPO_PUBLIC_GRAPHQL_WS_URL) ?? deriveWsUrl(HTTP_URL);
