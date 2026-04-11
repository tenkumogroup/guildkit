import { access, cp } from "node:fs/promises";
import { join } from "node:path";
import { command, run } from "@drizzle-team/brocli";
import { syncDirs } from "./utils.ts";

const sourceNextJsAppDir = join(import.meta.dirname, "../..");
const intermediateDirPath = join(process.cwd(), ".guildkit/intermediate");

const syncFiles = async () => {
  // Copy GuildKit app
  console.info("Setting up GuildKit source code...");
  await syncDirs(sourceNextJsAppDir, intermediateDirPath);

  // Copy guildkit.config.*
  for (const ext of [ "ts", "js", "mjs" ]) {
    const configPath = join(process.cwd(), `guildkit.config.${ ext }`);

    try {
      await access(configPath);
      await cp(configPath, join(intermediateDirPath, `guildkit.config.${ ext }`));

      return;
    } catch {
      continue;
    }
  }

  throw new Error("guildkit.config.* was not found.");
};

await run([
  command({
    name: "dev",
    handler: async (opts) => {
      await syncFiles();
      // TODO run the Next.js app in dev mode. (Write equivalent code with `next dev`)
    },
  }),
  command({
    name: "build",
    handler: async (opts) => {
      await syncFiles();
      // TODO build the Next.js app in `intermediateDirPath`. (Write equivalent code with `next build`)
    },
  }),
]);
