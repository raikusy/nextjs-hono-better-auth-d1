import { hc } from "hono/client";

import type { HonoApp } from "@/server";

export const apiClient = hc<HonoApp>("/");
