"use client";

import { useQuery } from "@tanstack/react-query";

import { clientRPC } from "@/lib/client-rpc";

export function BlogListClient({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => clientRPC.api.posts.$get(),
  });

  console.log(data);
  return <>{children}</>;
}
