import { db } from "@/lib/db";

export async function patchSubtaskCompletedStatus(
  id: string,
  completed: boolean,
) {
  await db`UPDATE subtasks SET completed = ${completed} WHERE id = ${id};`;
}
