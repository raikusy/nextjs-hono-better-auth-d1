"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const postSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters",
  }),
  coverImage: z
    .string()
    .url({
      message: "Please enter a valid URL for the cover image",
    })
    .optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export function CreatePostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (data: PostFormValues) => {
      return Promise.resolve({ slug: "test-slug" });
    },
    onSuccess: (data) => {
      toast.success("Post created successfully");
      router.push(`/${data.slug}`);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post. Please try again.");
      setIsSubmitting(false);
    },
  });

  function onSubmit(data: PostFormValues) {
    setIsSubmitting(true);
    createPostMutation.mutate(data);
  }

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
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a short excerpt for your post" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>This will be displayed on the blog listing page.</FormDescription>
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
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>Leave blank to use a placeholder image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Post
        </Button>
      </form>
    </Form>
  );
}
