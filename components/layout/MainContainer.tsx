import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function MainContainer({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#030914] text-white antialiased selection:bg-[#1bf8c3]/20 selection:text-[#1bf8c3]">
      {children}
    </div>
  );
}
