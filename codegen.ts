import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../oyana-backend/src/schema.gql",
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
