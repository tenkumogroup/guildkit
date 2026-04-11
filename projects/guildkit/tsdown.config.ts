import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    config: "./src/devkit/config.ts",
  },
  format: [ "esm" ],

  dts: true,
  sourcemap: true,

  treeshake: true,
  minify: true,
  clean: true,
});
