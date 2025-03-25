"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/hc-client";

export function BlogListClient({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient.api.posts.$get(),
  });

  console.log(data);
  return <>{children}</>;
}
