"use server";

import { hc } from "hono/client";
import { cookies } from "next/headers";

import { env } from "@/env/server";
import type { HonoApp } from "@/server";

const apiClient = hc<HonoApp>(env.API_URL, {
  fetch: async (input, reqInit, _env, _executionCtx) => {
    const response = await fetch(input, {
      ...reqInit,
      credentials: "include",
      headers: {
        ...reqInit?.headers,
        Cookie: (await cookies()).toString(), // On server components, we need to pass the cookies to the fetch request
      },
    });
    return response;
  },
});

/**
 * Get the RPC client for server components
 * @returns The server RPC client
 */
export async function getServerRPC() {
  return apiClient;
}
