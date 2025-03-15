import type { D1Database } from "@cloudflare/workers-types";
import type { Env } from "hono";
import type { getAuth } from "./auth";

export interface AppBindings extends Env {
  Bindings: {
    DB: D1Database;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BETTER_AUTH_URL: string;
  };
  Variables: {
    auth: ReturnType<typeof getAuth>;
  };
}
