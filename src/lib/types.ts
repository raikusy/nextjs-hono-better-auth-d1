import type { D1Database } from "@cloudflare/workers-types";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { Env } from "hono";

import type { DBSchema } from "@/server/db";

import type { getAuth } from "./auth";

export interface AppBindings extends Env {
  Bindings: {
    DB: D1Database;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BETTER_AUTH_URL: string;
    FRONTEND_URL: string;
  };
  Variables: {
    auth: ReturnType<typeof getAuth>;
    db: DrizzleD1Database<DBSchema>;
  };
}

export interface Author {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readingTime: number;
  author: Author;
}
