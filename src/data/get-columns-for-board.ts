import { TColumn } from "@/data/types";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getColumnsForBoard = unstable_cache(
  async (boardId: number) =>
    db`SELECT * FROM columns WHERE board_id=${boardId}` as Promise<TColumn[]>,
  ["columns"],
  {
    tags: ["columns"],
  }
);
