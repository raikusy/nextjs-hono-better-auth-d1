import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, openAPI } from "better-auth/plugins";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { Context } from "hono";
import type { AppBindings } from "./types";

export function getAuth(c: Context<AppBindings>) {
  return betterAuth({
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
    database: drizzleAdapter(drizzleD1(c.env.DB), {
      provider: "sqlite",
      usePlural: true,
    }),
  });
}
