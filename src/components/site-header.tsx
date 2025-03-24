"use client";

import type { Session, User } from "better-auth";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader({ currentSession }: { currentSession: { user: User; session: Session } | null }) {
  const pathname = usePathname();

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b px-4 md:px-0">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Next.js Blog</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/"
              className={`flex items-center text-sm font-medium ${
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              } hover:text-foreground/80 transition-colors`}
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {currentSession ? (
            <Link
              href="/create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden h-9 items-center justify-center rounded-md px-3 text-sm font-medium shadow md:inline-flex"
            >
              <Plus className="mr-1 h-4 w-4" />
              New Post
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden h-9 items-center justify-center rounded-md px-3 text-sm font-medium shadow md:inline-flex"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="hover:text-foreground/80 text-sm font-medium transition-colors">
                  Blog
                </Link>
                {currentSession ? (
                  <Link href="/create" className="hover:text-foreground/80 text-sm font-medium transition-colors">
                    Create Post
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="hover:text-foreground/80 text-sm font-medium transition-colors">
                      Login
                    </Link>
                    <Link href="/register" className="hover:text-foreground/80 text-sm font-medium transition-colors">
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
