"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { AUTH_COOKIE_NAME } from "@/config/constants";

// import { authClient } from "./auth-client";
import { apiClient } from "./hc-client";

/**
 * Gets the current user session from the API
 * @returns The current user session or null if not authenticated
 */
export const getCurrentUser = cache(async () => {
  try {
    // const response = await authClient.getSession();

    // console.log(response);

    // return response.data;

    const cookieStore = await cookies();
    const cookie = cookieStore.get(AUTH_COOKIE_NAME);

    const response = await apiClient.api.session.$get(
      {},
      {
        headers: {
          Credentials: "include",
          Cookie: cookie ? `${cookie?.name}=${cookie?.value}` : "",
        },
      }
    );
    const body = await response.json();
    console.log(body);

    return body;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
});

/**
 * Checks if the user is authenticated and redirects to login if not
 * @param redirectTo The path to redirect to after login
 */
export async function requireAuth(redirectTo = "/login") {
  const currentSession = await getCurrentUser();

  if (!currentSession || !currentSession.user || !currentSession.session) {
    redirect(redirectTo);
  }

  return currentSession;
}
