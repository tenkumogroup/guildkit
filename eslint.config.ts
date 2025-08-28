import { core } from "@phanect/lint";
import { astro } from "@phanect/lint-astro";
import { nextjs } from "@phanect/lint-react";
import { defineConfig, globalIgnores } from "eslint/config";

const configs = defineConfig([
  globalIgnores([
    "./projects/guildkit/src/intermediate/**",
    "./projects/guildkit/src/lib/prisma/**",
  ]),

  ...core,
  ...nextjs,
  ...astro,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);

export default configs;
