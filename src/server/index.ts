import { getAuth } from "@/lib/auth";

import honoFactory from "./hono-factory";
import postsRoute from "./routes/posts-route";

const sessionMiddleware = honoFactory.createMiddleware(async (c, next) => {
  const auth = c.get("auth");
  console.log("Session middleware - cookies:", c.req.raw.headers.get("cookie"));
  const userSession = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  console.log("Session middleware - userSession:", userSession);
  const { user, session } = userSession ?? { user: null, session: null };
  c.set("user", user);
  c.set("session", session);
  await next();
});

const routes = honoFactory
  .createApp()
  .basePath("/api")
  .use(sessionMiddleware)
  .on(["POST", "GET"], "/auth/*", (c) => {
    return getAuth(c).handler(c.req.raw);
  })
  .route("/posts", postsRoute);

export type HonoApp = typeof routes;
export default routes;
