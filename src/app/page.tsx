import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { BlogList } from "@/components/blog-list";
import { BlogListSkeleton } from "@/components/blog-list-skeleton";
import { getCurrentUser } from "@/lib/auth-utils";

export default async function HomePage() {
  const currentSession = await getCurrentUser();
  return (
    <div className="container mx-auto px-4 py-8 md:px-0 md:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-muted-foreground text-xl">Explore the latest articles and insights from our team.</p>
        </div>
        <div className="flex items-center gap-2">
          {currentSession ? (
            <>
              <Link
                href="/create"
                className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border-input bg-background text-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="py-8">
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}
