import type { GuildKitConfig } from "guildkit/config";

// TODO make these items configurable by the GuildKit instance admins

const config: GuildKitConfig = {
  siteName: "GuildKit Demo",
  storage: process.env.SERVER_ENV === "development" ? {
    platform: "development",
  } : {
    platform: "cloudflare",
  },
  maxLogoSizeMiB: 8,
  dev: {
    port: 3000,
  },
};

export default config;
