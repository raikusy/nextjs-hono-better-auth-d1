import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { posts } from "../db/post-schema.sql";

export const postSchema = createSelectSchema(posts, {
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Post = z.infer<typeof postSchema>;

export const postCreateSchema = createInsertSchema(posts).pick({
  title: true,
  content: true,
  coverImage: true,
});
export type PostCreate = z.infer<typeof postCreateSchema>;

export const postUpdateSchema = createUpdateSchema(posts);
export type PostUpdate = z.infer<typeof postUpdateSchema>;
