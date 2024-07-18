"use client";

import { AuthPageType } from "@/components/auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

export function AuthFormContent({ type }: { type: AuthPageType }) {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" type="text" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button
        type="submit"
        className="w-full disabled:opacity-50"
        disabled={pending}
      >
        {type === "login" ? "Sign in" : "Sign up"}
      </Button>
    </>
  );
}
