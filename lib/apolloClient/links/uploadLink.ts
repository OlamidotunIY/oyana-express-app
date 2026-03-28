import { createHttpLink } from "@apollo/client";
import { HTTP_URL } from "../env";

export const uploadLink = createHttpLink({
  uri: HTTP_URL ?? "https://oyana.invalid/graphql",
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
    "x-oyana-client-platform": "mobile",
    "x-oyana-client-version": process.env.EXPO_PUBLIC_APP_VERSION ?? "mobile-unknown",
  },
});
