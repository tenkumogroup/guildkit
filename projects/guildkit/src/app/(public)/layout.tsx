import { headers } from "next/headers";
import { Nav } from "@/components/Nav.tsx";
import { getSession } from "@/lib/auth/server.ts";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function PublicLayout({ children }: Props): Promise<ReactElement> {
  const { user } = await getSession({
    headers: await headers(),
  }) ?? {};

  const userType = user?.type ?? "guest" as const;

  return (
    <>
      <Nav for={userType} />
      <main className="flex flex-col items-center gap-4 w-full">
        {children}
      </main>
    </>
  );
}
