import { relations } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

import { users } from "./auth-schema.sql";

export const posts = sqliteTable("posts", (t) => ({
  id: t.text("id").primaryKey(),
  title: t.text("title").notNull(),
  content: t.text("content").notNull(),
  slug: t.text("slug").notNull(),
  authorId: t
    .text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  coverImage: t.text("cover_image"),
  readingTime: t.integer("reading_time").notNull(),
  excerpt: t.text("excerpt").notNull(),
  createdAt: t.integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: t.integer("updated_at", { mode: "timestamp" }).notNull(),
}));

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
