import { handle } from "hono/vercel";

import routes from "@/server";

export const GET = handle(routes);
export const POST = handle(routes);
