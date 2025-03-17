import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

import { posts } from "../db/post-schema.sql";
import honoFactory from "../hono-factory";
import { postCreateSchema, postUpdateSchema } from "../validations/post.schema";

const postsRoute = honoFactory
  .createApp()
  .get("/", async (c) => {
    const db = c.get("db");
    const posts = await db.query.posts.findMany();
    return c.json(posts);
  })
  .post("/", zValidator("json", postCreateSchema), async (c) => {
    const db = c.get("db");
    const auth = c.get("auth");
    const currentSession = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!currentSession) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const post = await db.insert(posts).values({
      ...c.req.valid("json"),
      authorId: currentSession.user.id,
    });
    return c.json(post);
  })
  .get("/:id", async (c) => {
    const db = c.get("db");
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, c.req.param("id")),
    });
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(post);
  })
  .patch("/:id", zValidator("json", postUpdateSchema), async (c) => {
    const db = c.get("db");
    const post = await db
      .update(posts)
      .set({
        ...c.req.valid("json"),
      })
      .where(eq(posts.id, c.req.param("id")));
    return c.json(post);
  })
  .delete("/:id", async (c) => {
    const db = c.get("db");
    const post = await db.delete(posts).where(eq(posts.id, c.req.param("id")));
    return c.json(post);
  });

export default postsRoute;
