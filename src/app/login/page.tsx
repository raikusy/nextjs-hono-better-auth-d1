import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/auth-utils";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const currentSession = await getCurrentUser();
  if (currentSession) {
    redirect("/");
  }
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Enter your credentials to sign in to your account</p>
        </div>
        <LoginForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
