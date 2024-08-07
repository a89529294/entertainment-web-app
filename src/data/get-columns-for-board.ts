import { TColumn, TColumnsWithTasks } from "@/data/types";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getColumnsForBoard = unstable_cache(
  async (boardId: number) =>
    db`SELECT * FROM columns WHERE board_id=${boardId}` as Promise<TColumn[]>,
  ["columns"],
  {
    tags: ["columns"],
  },
);

export const getColumnsAndTasksForBoard = unstable_cache(
  async (boardId: string) =>
    db`SELECT c.id AS column_id, c.name AS column_name, c.sequence AS column_sequence, 
	     t.id AS task_id, t.name AS task_name, t.sequence AS task_sequence, t.description AS task_description, t.status AS task_status
       FROM boards b
       JOIN columns c ON b.id = c.board_id
       LEFT JOIN tasks t ON c.id = t.column_id
       WHERE b.id = ${boardId}
       ORDER BY c.sequence, t.sequence
       ` as Promise<TColumnsWithTasks[]>,
  ["columns-with-tasks"],
  {
    tags: ["columns-with-tasks"],
  },
);
