import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/**.sql.ts",
  out: "./src/server/db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
} satisfies Config;
