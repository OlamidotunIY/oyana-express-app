type GraphQLErrorLike = {
  message?: string;
  extensions?: Record<string, unknown>;
};

const UNAUTHENTICATED_MESSAGE_MATCHERS = [
  "unauthorized",
  "unauthenticated",
  "invalid or expired session",
  "invalid refresh token",
  "refresh token",
];

function includesUnauthorizedMessage(message?: string): boolean {
  if (!message) {
    return false;
  }

  const normalized = message.toLowerCase();
  return UNAUTHENTICATED_MESSAGE_MATCHERS.some((matcher) => normalized.includes(matcher));
}

function toStatusCode(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsedValue = Number(value);
    if (Number.isFinite(parsedValue)) {
      return parsedValue;
    }
  }

  return null;
}

function toGraphQLErrors(error: unknown): GraphQLErrorLike[] {
  if (!error || typeof error !== "object") {
    return [];
  }

  const candidate = error as {
    graphQLErrors?: unknown;
    errors?: unknown;
  };

  if (Array.isArray(candidate.graphQLErrors)) {
    return candidate.graphQLErrors as GraphQLErrorLike[];
  }

  if (Array.isArray(candidate.errors)) {
    return candidate.errors as GraphQLErrorLike[];
  }

  return [];
}

export function extractBackendErrorMessages(error: unknown): string[] {
  const graphQLErrors = toGraphQLErrors(error);
  const messages: string[] = [];

  for (const graphQLError of graphQLErrors) {
    if (typeof graphQLError?.message === "string" && graphQLError.message.trim().length > 0) {
      messages.push(graphQLError.message.trim());
    }

    const details = graphQLError?.extensions?.details;
    if (Array.isArray(details)) {
      for (const detail of details) {
        if (typeof detail === "string" && detail.trim().length > 0) {
          messages.push(detail.trim());
        }
      }
    }
  }

  if (messages.length > 0) {
    return messages;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return [error.message.trim()];
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return [error.trim()];
  }

  return [];
}

export function getBackendErrorMessage(error: unknown, fallbackMessage: string): string {
  const messages = extractBackendErrorMessages(error);
  if (messages.length > 0) {
    return messages[0];
  }

  return fallbackMessage;
}

export function isUnauthenticatedGraphQLError(error: unknown): boolean {
  const graphQLErrors = toGraphQLErrors(error);

  if (graphQLErrors.length > 0) {
    return graphQLErrors.some((graphQLError) => {
      const code = typeof graphQLError?.extensions?.code === "string"
        ? graphQLError.extensions.code.toUpperCase()
        : "";
      const statusCode = toStatusCode(graphQLError?.extensions?.statusCode);

      return (
        code === "UNAUTHENTICATED" ||
        code === "UNAUTHORIZED" ||
        statusCode === 401 ||
        includesUnauthorizedMessage(graphQLError?.message)
      );
    });
  }

  if (error instanceof Error) {
    return includesUnauthorizedMessage(error.message);
  }

  if (typeof error === "string") {
    return includesUnauthorizedMessage(error);
  }

  return false;
}
