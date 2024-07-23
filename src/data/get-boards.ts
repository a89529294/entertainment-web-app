import { Board } from "@/data/types";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getUserBoards = unstable_cache(
  async (userId: string) =>
    db`SELECT * FROM boards WHERE user_id=${userId}` as Promise<Board[]>,
  ["boards"],
  {
    tags: ["boards"],
  }
);
