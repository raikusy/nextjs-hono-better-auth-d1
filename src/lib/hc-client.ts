import { hc } from "hono/client";

import { env } from "@/env/client";
import type { HonoApp } from "@/server";

export const apiClient = hc<HonoApp>(env.NEXT_PUBLIC_API_URL);
