import honoFactory from "../hono-factory";

export const sessionMiddleware = honoFactory.createMiddleware(async (c, next) => {
  const auth = c.get("auth");
  const userSession = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  const { user, session } = userSession ?? { user: null, session: null };
  c.set("user", user);
  c.set("session", session);
  await next();
});
