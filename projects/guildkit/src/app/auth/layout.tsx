import { CenterBox } from "@/components/generic/CenterBox.tsx";
import { Nav } from "@/components/Nav.tsx";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props): ReactElement {
  return (
    <>
      <Nav for="guest" />
      <CenterBox className="w-full">
        {children}
      </CenterBox>
    </>
  );
}
