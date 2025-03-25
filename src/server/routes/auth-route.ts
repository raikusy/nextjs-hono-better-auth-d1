import { zValidator } from "@hono/zod-validator";

import honoFactory from "../hono-factory";
import { loginSchema, registerSchema } from "../validations/auth.schema";

const authRoute = honoFactory
  .createApp()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const data = c.req.valid("json");
    const auth = c.get("auth");
    const { email, password } = data;

    try {
      const res = await auth.api.signInEmail({
        header: c.req.raw.headers,
        body: { email, password },
        asResponse: true,
      });

      const cookies = res.headers.get("set-cookie");
      if (cookies) {
        c.header("set-cookie", cookies);
      }
      const body = await res.json();
      return c.json(body);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong!";
      return c.json({ message }, 500);
    }
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { email, password, name } = c.req.valid("json");
    const auth = c.get("auth");
    const user = await auth.api.signUpEmail({
      headers: c.req.raw.headers,
      body: {
        email,
        password,
        name,
      },
    });
    return c.json(user);
  })
  .get("/session", async (c) => {
    const auth = c.get("auth");
    const db = c.get("db");
    console.log(c.req.raw.headers);
    const allSessions = await db.query.sessions.findMany();
    console.log("allSessions", allSessions);
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    console.log("/session", session);
    return c.json(session);
  })
  .get("/google", async (c) => {
    const auth = c.get("auth");
    const url = await auth.api.signInSocial({
      headers: c.req.raw.headers,
      body: {
        provider: "google",
        redirectURI: `${c.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      },
    });

    if (!url || !url.url) {
      return c.json({ error: "Failed to get Google login URL" }, 500);
    }

    return c.redirect(url.url);
  })
  .get("/google/callback", async (c) => {
    const auth = c.get("auth");
    const user = await auth.api.signInSocial({
      headers: c.req.raw.headers,
      body: {
        provider: "google",
        code: c.req.query("code"),
      },
    });
    return c.json(user);
  })
  .get("/session", async (c) => {
    const auth = c.get("auth");
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ user: null });
    }

    return c.json({ user: session.user });
  });

export default authRoute;
