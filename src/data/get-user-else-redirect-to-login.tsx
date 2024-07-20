import { lucia, validateRequest } from "@/lib/auth";
import { Form, type ActionResult } from "@/components/auth/form";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getUserElseRedirectToLogin() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return user;
}

export async function getUser() {
  const { user } = await validateRequest();
  return user;
}
