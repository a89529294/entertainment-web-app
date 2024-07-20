import { Board } from "@/data/types";
import { db } from "@/lib/db";

export async function getUserBoards(userId: string) {
  return db`SELECT * FROM boards WHERE user_id=${userId}` as Promise<Board[]>;
}
