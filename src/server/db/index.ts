import { drizzle } from "drizzle-orm/d1";
import type { Context } from "hono";

import type { AppBindings } from "@/lib/types";

import * as authSchema from "./auth-schema.sql";
import * as postSchema from "./post-schema.sql";

export const schema = { ...authSchema, ...postSchema };
export type DBSchema = typeof schema;

export function getDB(c: Context<AppBindings>) {
  return drizzle(c.env.DB, { schema });
}
