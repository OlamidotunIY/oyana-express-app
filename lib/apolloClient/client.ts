import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import {
  buildAuthCookieHeader,
  ensureAuthCookiesLoaded,
  getAccessTokenCookie,
} from "@/lib/auth-cookies";
import { WS_URL } from "./env";
import { authLink } from "./links/authLink";
import { errorLink } from "./links/errorLink";
import { createLoadingLink } from "./links/loadingLink";
import { uploadLink } from "./links/uploadLink";

loadErrorMessages();
loadDevMessages();

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    lazy: true,
    retryAttempts: 5,
    shouldRetry: () => true,
    connectionParams: async () => {
      await ensureAuthCookiesLoaded();

      const accessToken = getAccessTokenCookie();
      const cookieHeader = buildAuthCookieHeader();
      const version = process.env.EXPO_PUBLIC_APP_VERSION ?? "mobile-unknown";

      return {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        "x-oyana-client-platform": "mobile",
        "x-oyana-client-version": version,
      };
    },
  }),
);

const httpLink = ApolloLink.from([authLink, uploadLink]);

export const link = ApolloLink.from([
  createLoadingLink(),
  errorLink,
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  ),
]);

/**
 * Apollo Client
 */
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getProviderDashboardQuary: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            },
          },
        },
      },
    },
  }),
});
