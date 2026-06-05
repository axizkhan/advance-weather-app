import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function MainContainer({ children }: Props) {
  return <div className="flex min-h-screen">{children}</div>;
}
