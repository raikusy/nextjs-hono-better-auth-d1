import { getAuth } from "@/lib/auth";

import honoFactory from "./hono-factory";
import authRoute from "./routes/auth-route";
import postsRoute from "./routes/posts-route";

const sessionMiddleware = honoFactory.createMiddleware(async (c, next) => {
  const auth = c.get("auth");
  const userSession = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  const { user, session } = userSession ?? { user: null, session: null };
  c.set("user", user);
  c.set("session", session);
  await next();
});

const routes = honoFactory
  .createApp()
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return getAuth(c).handler(c.req.raw);
  })
  .route("/", authRoute)
  .use(sessionMiddleware)
  .route("/posts", postsRoute);

export type HonoApp = typeof routes;
export default routes;
