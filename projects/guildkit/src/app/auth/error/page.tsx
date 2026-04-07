import { redirect } from "next/navigation";
import type { ReactElement } from "react";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthErrorPage({ searchParams }: PageProps): Promise<ReactElement> {
  const { error: errorId } = await searchParams;

  if (errorId === "signup_disabled") {
    redirect("/auth/signup");
  }

  const message = errorId === "unable_to_create_user"
    ? "Unable to create user. We're sorry, this is probably our bug."
    : "Unexpected error. We're sorry, this is probably our bug.";

  return (
    <p>
      {message}
    </p>
  );
}
