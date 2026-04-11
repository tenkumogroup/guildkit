import type { S3ClientConfig } from "@aws-sdk/client-s3";

type StorageConfig<PLATFORM extends "generic" | "aws" | "cloudflare" | "development" = "generic"> = {
  /** Bucket platform */
  platform: PLATFORM;

  /** S3 client configs passing to `@aws-sdk/client-s3` */
  s3: PLATFORM extends "cloudflare" ? Omit<S3ClientConfig, "region"> & {
    /** @deprecated `region` is always `auto` on Cloudflare R2. */
    region?: "auto";
  } : PLATFORM extends "development" ? Omit<S3ClientConfig, "endpoint" | "region" | "forcePathStyle" | "credentials">
  : S3ClientConfig;
};

export type GuildKitConfig = {
  siteName: string;
  storage: StorageConfig;
  maxLogoSizeMiB?: number;
};
