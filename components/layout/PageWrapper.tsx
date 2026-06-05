import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageWrapper({ children }: Props) {
  return <main className="flex-1 p-6">{children}</main>;
}
