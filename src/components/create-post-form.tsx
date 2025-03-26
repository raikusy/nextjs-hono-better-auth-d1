"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clientRPC } from "@/lib/client-rpc";
import { type Post, type PostCreate, postCreateSchema } from "@/server/validations/post.schema";

export function CreatePostForm() {
  const router = useRouter();

  const form = useForm<PostCreate>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImage: "",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: PostCreate) => {
      const res = await clientRPC.api.posts.$post({ json: data });
      return res.json() as Promise<Post>;
    },
    onSuccess: async (data) => {
      try {
        toast.success("Post created successfully");
        const slug = data.slug;

        if (slug) {
          router.push(`/post/${slug}`);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error processing response:", error);
        toast.error("Error processing response");
      }
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error(error.message || "Failed to create post. Please try again.");
    },
  });

  const onSubmit = async (data: PostCreate) => {
    await createPostMutation.mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your post content here..." className="min-h-[300px] resize-y" {...field} />
              </FormControl>
              <FormDescription>Use double line breaks for new paragraphs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>Leave blank to use a placeholder image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={createPostMutation.isPending}>
          {createPostMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Post
        </Button>
      </form>
    </Form>
  );
}
