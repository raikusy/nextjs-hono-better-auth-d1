import { getAuth } from "@/lib/auth";

import honoFactory from "./hono-factory";
import authRoute from "./routes/auth-route";
import postsRoute from "./routes/posts-route";

const routes = honoFactory
  .createApp()
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return getAuth(c).handler(c.req.raw);
  })
  .route("/", authRoute)
  .route("/posts", postsRoute);

export type HonoApp = typeof routes;
export default routes;
