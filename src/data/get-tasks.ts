import { TTask } from "@/data/types";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getTaskAndSubtasks = unstable_cache(
  async (taskId: string) =>
    db`SELECT st.* FROM tasks as t JOIN subtasks as st ON t.id = st.task_id WHERE t.id = ${taskId}`,
  ["task-and-subtasks"],
  {
    tags: ["task-and-subtasks"],
  },
);
