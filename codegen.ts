import type { CodegenConfig } from "@graphql-codegen/cli";

const graphqlEndpoint = `${
  (process.env.EXPO_PUBLIC_API_URL ?? "https://oyana-backend-lf75.onrender.com").replace(/\/$/, "")
}/graphql`;

const config: CodegenConfig = {
  schema: graphqlEndpoint,
  documents: ["./**/*.{ts,tsx}", "!./gql/**/*", "!./node_modules/**"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        documentMode: "string",
      },
      plugins: [],
    },
  },
};

export default config;
