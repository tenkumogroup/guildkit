import { OrgEditor } from "@/components/OrgEditor.tsx";
import { requireAuthAs } from "@/lib/auth/server.ts";
import type { ReactElement } from "react";

export default async function NewOrgPage(): Promise<ReactElement> {
  await requireAuthAs("recruiter", { allowOrphanRecruiter: true });

  return <OrgEditor org="new" />;
}
