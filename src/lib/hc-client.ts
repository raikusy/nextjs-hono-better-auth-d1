import { hc } from "hono/client";

import { env } from "@/env/client";
import type { HonoApp } from "@/server";

export const apiClient = hc<HonoApp>(env.NEXT_PUBLIC_API_URL, {
  fetch: async (input, reqInit, env, executionCtx) => {
    const response = await fetch(input, {
      ...reqInit,
      credentials: "include",
    });
    return response;
  },
});
