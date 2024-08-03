import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cache } from "react";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serverContext = <T>(
  defaultValue: T,
): [() => T, (v: T) => void] => {
  const getRef = cache(() => ({ current: defaultValue }));

  const getValue = (): T => getRef().current;

  const setValue = (value: T) => {
    getRef().current = value;
  };

  return [getValue, setValue];
};

export function generateRandomColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substring(value.toString(16).length);
  }

  return color;
}

// export async function redirectIfInvalidSession() {
//   const auth = await validateRequest();

//   if (!auth.user) return redirect("/");

//   return auth;
// }
