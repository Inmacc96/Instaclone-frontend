import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const config: CodegenConfig = {
  schema: `${process.env.VITE_BACKEND_URI}/graphql`,
  documents: ["src/gql/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
