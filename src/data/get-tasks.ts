import { TTask } from "@/data/types";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getTasksForColumn = unstable_cache(
  async (columnId: number) =>
    db`SELECT * FROM tasks WHERE column_id = ${columnId}` as Promise<TTask[]>,
  ["tasks"],
  {
    tags: ["tasks"],
  }
);
