import type { auth } from "@/lib/auth.ts";

export type User = typeof auth.$Infer.Session["user"];

export type Session = typeof auth.$Infer.Session["session"];

export type Organization = typeof auth.$Infer.Organization;
