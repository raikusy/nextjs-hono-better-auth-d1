import Image from "next/image";
import Link from "next/link";

import { getServerRPC } from "@/lib/server-rpc";
import { formatDate } from "@/lib/utils";

export async function BlogList() {
  const rpc = await getServerRPC();
  const postResponse = await rpc.api.posts.$get();
  const posts = await postResponse.json();

  console.log(posts);
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.slug}`}>
          <article className="group relative flex flex-col space-y-2">
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="group-hover:text-primary line-clamp-1 text-xl font-semibold tracking-tight transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <p className="text-muted-foreground text-sm">{formatDate(post.createdAt)}</p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
