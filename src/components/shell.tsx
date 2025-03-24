import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return <main className="container mx-auto px-4 py-6 md:px-6 md:py-8">{children}</main>;
}
