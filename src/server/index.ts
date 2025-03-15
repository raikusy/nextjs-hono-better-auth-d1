import { getAuth } from "@/lib/auth";
import type { AppBindings } from "@/lib/types";
import { Hono } from "hono";

const app = new Hono<AppBindings>();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return getAuth(c).handler(c.req.raw);
});

export type App = typeof app;
export default app;
