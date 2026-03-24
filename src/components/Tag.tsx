import type { ReactElement } from "react";

type Props = {
  children: string;
};

export function Tag({ children }: Props): ReactElement {
  return (
    <span className="inline-flex items-center gap-1.5 py-2 px-4 text-sm font-medium text-gray-800 bg-blue-100 rounded-full">
      {children}
    </span>
  );
}
