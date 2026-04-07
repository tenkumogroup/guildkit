import { getBase64FromImageURL } from "@/lib/utils/utils.ts";
import { OrgEditorClient } from "./OrgEditor.client.tsx";
import type { ReactElement } from "react";
import type { Organization } from "@/lib/auth/types.ts";

type Props = {
  org: Organization | "new";
};

export const OrgEditor = async ({ org }: Props): Promise<ReactElement> => {
  if (org === "new") {
    return <OrgEditorClient />;
  } else {
    const logoBase64 = org.logo ? await getBase64FromImageURL(org.logo) : undefined;

    return <OrgEditorClient org={org} initialLogoBase64={logoBase64} />;
  }
};
