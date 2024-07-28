"use server";

import { TSubtask } from "@/data/types";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function addNewTask(
  columnId: number,
  sequence: number,
  formData: FormData
) {
  console.log(columnId, formData);

  const name = formData.get("name")!.toString().trim();
  const description = formData.get("description")?.toString().trim() ?? "";

  const tasks =
    await db`INSERT INTO tasks (column_id, name, description, sequence) VALUES (${columnId}, ${name}, ${description}, ${sequence}) RETURNING id`;
  const taskId = tasks[0].id;

  const subtasks = [] as Omit<TSubtask, "id">[];

  Array.from(formData.entries()).forEach(([key, value]) => {
    const trimmedValue = value.toString().trim();
    if (key.startsWith("subtask") && trimmedValue) {
      subtasks.push({
        name: trimmedValue,
        task_id: taskId,
      });
    }
  });

  if (subtasks.length) {
    await db`
    INSERT INTO subtasks ${db(subtasks, "task_id", "name")} 
  `;
  }

  revalidateTag("tasks");
}
