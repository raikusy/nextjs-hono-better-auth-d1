import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink, openAPI } from "better-auth/plugins";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { Context } from "hono";

import { ORIGINS } from "@/config/constants";

import * as schema from "../../auth-schema";
import type { AppBindings } from "./types";

let authInstance: ReturnType<typeof betterAuth>;

export function getAuth(c: Context<AppBindings>) {
  if (!authInstance) {
    authInstance = betterAuth({
      advanced: {
        defaultCookieAttributes: {
          httpOnly: true,
          sameSite: "lax",
          partitioned: true,
        },
      },
      trustedOrigins: ORIGINS,
      secret: c.env.BETTER_AUTH_SECRET,
      baseURL: c.env.BETTER_AUTH_URL,
      emailAndPassword: {
        enabled: true,
      },
      plugins: [
        openAPI(),
        magicLink({
          sendMagicLink: async ({ email, url }) => {
            console.log(email, url);
          },
        }),
        nextCookies(),
      ],
      socialProviders: {
        google: {
          enabled: true,
          clientId: c.env.GOOGLE_CLIENT_ID!,
          clientSecret: c.env.GOOGLE_CLIENT_SECRET!,
        },
      },
      database: drizzleAdapter(
        drizzleD1(c.env.DB, {
          schema: {
            ...schema,
          },
        }),
        {
          provider: "sqlite",
          usePlural: true,
        }
      ),
    });
  }
  return authInstance;
}
