// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig } from "eslint/config";
import { core } from "@phanect/lint";
import { nextjs } from "@phanect/lint-react";

const configs = defineConfig([
  {
    ignores: [
      "./.next/**",
      "./build/**",
      "./out/**",
      "./tmp/**",
      "./src/lib/db/schema/better-auth.ts",
      "./src/lib/db/schema/currencies.ts",
      "./src/lib/db/schema/index.ts",
      "next-env.d.ts",
    ],
  },
  ...core,
  ...nextjs,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);

export default configs;
