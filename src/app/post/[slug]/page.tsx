import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogPost } from "@/components/blog-post";
import { BlogPostSkeleton } from "@/components/blog-post-skeleton";
import { apiClient } from "@/lib/hc-client";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const postResponse = await apiClient.api.posts[":id"].$get({
    param: { id: slug },
  });
  const post = await postResponse.json();

  if ("error" in post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return (
    <div className="container mx-auto py-8 md:py-12">
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostContent slug={slug} />
      </Suspense>
    </div>
  );
}

async function BlogPostContent({ slug }: { slug: string }) {
  const postResponse = await apiClient.api.posts[":id"].$get({
    param: { id: slug },
  });
  const post = await postResponse.json();

  if ("error" in post) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
