import app from "@/server";
import { handle } from "hono/cloudflare-pages";

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
