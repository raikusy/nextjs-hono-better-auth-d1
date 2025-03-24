import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, openAPI } from "better-auth/plugins";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { Context } from "hono";

import * as schema from "../../auth-schema";
import type { AppBindings } from "./types";

export function getAuth(c: Context<AppBindings>) {
  return betterAuth({
    baseURL: c.env.BETTER_AUTH_URL,
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: "localhost", // Domain with a leading period
      },
      defaultCookieAttributes: {
        secure: true,
        httpOnly: true,
        sameSite: "none", // Allows CORS-based cookie sharing across subdomains
        partitioned: true, // New browser standards will mandate this for foreign cookies
      },
    },
    trustedOrigins: ["http://localhost:3000", "http://localhost:8787"],
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
