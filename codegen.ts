import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://192.168.0.197:3500/graphql",
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
