import { Metadata } from "next";

import { CreatePostForm } from "@/components/create-post-form";
import { PageHeader } from "@/components/page-header";
import { Shell } from "@/components/shell";
import { requireAuth } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: "Create New Post",
  description: "Create a new blog post",
};

export default async function CreatePostPage() {
  // Ensure the user is authenticated
  await requireAuth();

  return (
    <Shell>
      <PageHeader title="Create New Post" description="Share your thoughts with the world" />
      <div className="mx-auto max-w-3xl py-6">
        <CreatePostForm />
      </div>
    </Shell>
  );
}
