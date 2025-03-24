import { redirect } from "next/navigation";
import { cache } from "react";

import { apiClient } from "./hc-client";

/**
 * Gets the current user session from the API
 * @returns The current user session or null if not authenticated
 */
export const getCurrentUser = cache(async () => {
  try {
    const response = await apiClient.api.session.$get();

    if (!response.ok) return null;

    const session = await response.json();
    return session?.user ? session : null;
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
