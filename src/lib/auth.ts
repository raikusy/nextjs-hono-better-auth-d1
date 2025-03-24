import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, openAPI } from "better-auth/plugins";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { Context } from "hono";

import { AUTH_COOKIE_NAME } from "@/config/constants";

import * as schema from "../../auth-schema";
import type { AppBindings } from "./types";

export function getAuth(c: Context<AppBindings>) {
  return betterAuth({
    advanced: {
      cookies: {
        session_token: {
          name: AUTH_COOKIE_NAME,
        },
      },
    },
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      openAPI(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          // send email to user
          console.log(email, url);
        },
      }),
    ],
    socialProviders: {
      google: {
        enabled: true,
        clientId: c.env.GOOGLE_CLIENT_ID!,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET!,
        redirectURI: `${c.env.BETTER_AUTH_URL}/api/auth/callback/google`,
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
