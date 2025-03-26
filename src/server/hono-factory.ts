import { createFactory } from "hono/factory";

// import { logger } from "hono/logger";

import { getAuth } from "@/lib/auth";
import { AppBindings } from "@/lib/types";

import { getDB } from "./db";

export default createFactory<AppBindings>({
  initApp: (app) => {
    // app.use(logger());
    app.use(async (c, next) => {
      const db = getDB(c);
      c.set("db", db);
      await next();
    });
    app.use(async (c, next) => {
      const auth = getAuth(c);
      c.set("auth", auth);
      await next();
    });
  },
});
