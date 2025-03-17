import Image from "next/image";

import { formatDate } from "@/lib/utils";
import type { Post } from "@/server/validations/post.schema";

interface BlogPostProps {
  post: Post;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
        <div className="text-muted-foreground flex items-center gap-x-4 text-sm">
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          <div className="flex items-center gap-1">
            <span className="bg-muted-foreground inline-block h-1 w-1 rounded-full"></span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
