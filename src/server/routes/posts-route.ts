import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import slugify from "slugify";

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
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const validJson = c.req.valid("json");
    const postBody = {
      ...validJson,
      excerpt: validJson.content.slice(0, 100),
      slug: slugify(validJson.title, { lower: true, strict: true, trim: true }),
      readingTime: Math.ceil(validJson.content.split(" ").length / 200),
    };
    const post = await db.insert(posts).values({
      ...postBody,
      authorId: user.id,
    });
    return c.json(post);
  })
  .get("/:slug", async (c) => {
    const db = c.get("db");
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, c.req.param("slug")),
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
