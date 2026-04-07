import { CenterBox } from "@/components/generic/CenterBox.tsx";
import { Nav } from "@/components/Nav.tsx";

export default function NotFoundPage() {
  return (
    <>
      <Nav for="guest" />
      <CenterBox>
        <h1>404: This page is not found.</h1>
      </CenterBox>
    </>
  );
}
