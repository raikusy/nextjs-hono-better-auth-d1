"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clientRPC } from "@/lib/client-rpc";
import type { BlogPost } from "@/lib/types";
import { type Post, type PostUpdate, postUpdateSchema } from "@/server/validations/post.schema";

interface EditPostFormProps {
  post: BlogPost;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();

  const form = useForm<PostUpdate>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async (data: PostUpdate) => {
      const res = await clientRPC.api.posts[":id"].$patch({
        param: { id: post.id },
        json: data,
      });
      return res.json() as Promise<Post>;
    },
    onSuccess: (data) => {
      toast.success("Post updated successfully");
      router.push(`/${data.slug}`);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update post. Please try again.");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await clientRPC.api.posts[":id"].$delete({
        param: { id },
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post. Please try again.");
    },
  });

  async function onSubmit(data: PostUpdate) {
    await updatePostMutation.mutateAsync({
      ...data,
      coverImage: data.coverImage || "/placeholder.svg?height=720&width=1280",
    });
  }

  async function onDelete() {
    await deletePostMutation.mutateAsync(post.id);
  }

  return (
    <>
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
                  <Textarea
                    placeholder="Write your post content here..."
                    className="min-h-[300px] resize-y"
                    {...field}
                  />
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
          <div className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Post
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your post and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} disabled={deletePostMutation.isPending}>
                    {deletePostMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" disabled={updatePostMutation.isPending}>
              {updatePostMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Post
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
