import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join } from "node:path";
import { command, run } from "@drizzle-team/brocli";
import { loadConfig } from "c12";
import next from "next";
import { syncDirs } from "./utils.ts";
import type { GuildKitConfig } from "./config.ts";

const sourceNextJsAppDir = join(import.meta.dirname, "../..");
const intermediateDirPath = join(process.cwd(), ".guildkit/intermediate");

const { config } = await loadConfig<GuildKitConfig>({
  configFile: "guildkit",
});

const syncFiles = async () => {
  // Copy GuildKit app
  console.info("Setting up GuildKit source code...");
  await syncDirs(sourceNextJsAppDir, intermediateDirPath);

  // Copy guildkit.config.*
  await writeFile(
    join(intermediateDirPath, "guildkit.config.ts"),
    `export const userConfigs = ${ JSON.stringify(config) } as const`
  );
};

await run([
  command({
    name: "dev",
    handler: async () => {
      await syncFiles();

      const port = (process.env.PORT ? parseInt(process.env.PORT) : undefined)
        ?? config?.dev?.port
        ?? 3000;
      const nextjs = next({
        dev: true,
        dir: intermediateDirPath,
        port,
      });
      const handle = nextjs.getRequestHandler();

      await nextjs.prepare();
      const server = createServer((req, res) => void handle(req, res));
      server.listen(port);

      console.log(`
        Server listening at http://localhost:${ port } as development
      `);
    },
  }),
  command({
    name: "build",
    handler: async () => {
      await syncFiles();

      await new Promise<void>((resolve, reject) => {
        const proc = spawn("next", [ "build" ], {
          cwd: intermediateDirPath,
          stdio: "inherit",
        });

        proc.on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`next build exited with code ${ code }`));
          }
        });

        proc.on("error", reject);
      });
    },
  }),
]);
