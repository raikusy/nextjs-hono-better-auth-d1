"use server";

import { hc } from "hono/client";
import { cookies } from "next/headers";
import { cache } from "react";

import { env } from "@/env/server";
import type { HonoApp } from "@/server";

const apiClient = hc<HonoApp>(env.API_URL, {
  fetch: async (input, reqInit, _env, _executionCtx) => {
    const response = await fetch(input, {
      ...reqInit,
      credentials: "include",
      headers: {
        ...reqInit?.headers,
        Cookie: (await cookies()).toString(),
      },
    });
    return response;
  },
});

export const getServerRPC = cache(async () => {
  return apiClient;
});
