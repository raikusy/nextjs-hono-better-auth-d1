import { zValidator } from "@hono/zod-validator";

import honoFactory from "../hono-factory";
import { loginSchema, registerSchema } from "../validations/auth.schema";

const authRoute = honoFactory
  .createApp()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const auth = c.get("auth");
    const user = await auth.api.signInEmail({
      headers: c.req.raw.headers,
      body: {
        email,
        password,
      },
    });
    return c.json(user);
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
  });

export default authRoute;
