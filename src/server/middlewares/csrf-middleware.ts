import { csrf } from "hono/csrf";

import { ORIGINS } from "@/config/constants";

export const csrfMiddleware = csrf({
  origin: ORIGINS,
});
