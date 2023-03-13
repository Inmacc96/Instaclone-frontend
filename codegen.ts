import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${import.meta.env.VITE_BACKEND_URI}/graphql`,
  documents: ["src/gql/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
