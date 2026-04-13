import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    cli: "./src/devkit/cli.ts",
    config: "./src/devkit/config.ts",
  },
  format: [ "esm" ],

  dts: true,
  sourcemap: true,

  treeshake: true,
  minify: true,
  clean: true,
});
