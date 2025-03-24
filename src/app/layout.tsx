import { Inter } from "next/font/google";
import type React from "react";

import { QueryProvider } from "@/components/query-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getCurrentUser } from "@/lib/auth-utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Blog",
  description: "A blog built with Next.js, Tailwind CSS, and shadcn/ui",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentSession = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader currentSession={currentSession} />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
