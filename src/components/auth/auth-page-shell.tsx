import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import Link from "next/link";

import { ChromeIcon, GitlabIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { lucia, validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { Form, type ActionResult } from "@/components/auth/form";
import { cn } from "@/lib/utils";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthPageType } from "@/components/auth/types";
import { AuthFormContent } from "@/components/auth/auth-form-content";

const typeMap = {
  login: {
    title: "Welcome back",
    subTitle: "Enter your username and password to sign in to your account.",
    otherPageText: "Don&apos;t have an account?",
    otherPageHref: "/signup",
    otherPageLinkLabel: "Sign up",
  },
  signup: {
    title: "Create an Account",
    subTitle: "Enter your details below to sign up for an account.",
    otherPageText: "Already have an account?",
    otherPageHref: "/login",
    otherPageLinkLabel: "Sign in",
  },
} satisfies Record<AuthPageType, any>;

export async function AuthPageShell({
  onSubmit,
  type,
}: {
  onSubmit: (_: any, formData: FormData) => Promise<ActionResult>;
  type: keyof typeof typeMap;
}) {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-80 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{typeMap[type]["title"]}</h1>
          <p className="text-muted-foreground">{typeMap[type]["subTitle"]}</p>
        </div>

        <Form className="space-y-4" action={onSubmit}>
          <AuthFormContent type={type} />
        </Form>

        <Separator className="my-8" />

        <div className="space-y-4">
          <Link
            href="/login/github"
            className={cn(
              buttonVariants({ className: "w-full", variant: "outline" })
            )}
          >
            <GitlabIcon className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Link>
          <Link
            href="/login/google"
            className={cn(
              buttonVariants({ className: "w-full", variant: "outline" })
            )}
          >
            <ChromeIcon className="mr-2 h-4 w-4" />
            Sign in with Google
          </Link>
          <div className="text-center text-sm text-muted-foreground">
            {typeMap[type]["otherPageText"]}{" "}
            <Link
              href={typeMap[type]["otherPageHref"]}
              className="underline underline-offset-4"
              prefetch={false}
            >
              {typeMap[type]["otherPageLinkLabel"]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
