import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

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
