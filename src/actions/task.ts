"use server";

import { TSubtask, TTask } from "@/data/types";
import { db } from "@/lib/db";
// import { redirectIfInvalidSession } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export async function addNewTask(
  columnId: string,
  sequence: number,
  formData: FormData,
) {
  console.log(columnId, formData);

  const name = formData.get("name")!.toString().trim();
  const description = formData.get("description")?.toString().trim() ?? "";

  const tasks =
    await db`INSERT INTO tasks (column_id, name, description, sequence) VALUES (${columnId}, ${name}, ${description}, ${sequence}) RETURNING id`;
  const taskId = tasks[0].id;

  const subtasks = [] as Omit<TSubtask, "id">[];

  let count = 0;
  Array.from(formData.entries()).forEach(([key, value]) => {
    const trimmedValue = value.toString().trim();
    if (key.startsWith("subtask") && trimmedValue) {
      subtasks.push({
        name: trimmedValue,
        task_id: taskId,
        sequence: count,
        completed: false,
      });
      count++;
    }
  });

  if (subtasks.length) {
    await db`
    INSERT INTO subtasks ${db(subtasks, "task_id", "name", "sequence")} 
  `;
  }

  revalidateTag("columns-with-tasks");
}

export async function swapTaskSequence(
  task1: { id: string; newSequence: number },
  task2: { id: string; newSequence: number },
) {
  const p1 = db`UPDATE tasks SET sequence = ${task1.newSequence} WHERE id = ${task1.id}`;
  const p2 = db`UPDATE tasks SET sequence = ${task2.newSequence} WHERE id = ${task2.id}`;
  await Promise.all([p1, p2]);
}

export async function updateTaskSequences(
  ...tasks: { id: string; newSequence: number; newColumnId?: string }[]
) {
  const promises = [] as Promise<unknown>[];

  for (const task of tasks) {
    console.log(task);
    if (task.newColumnId)
      promises.push(
        db`UPDATE tasks SET sequence = ${task.newSequence}, column_id=${task.newColumnId} WHERE id = ${task.id}`,
      );
    else
      promises.push(
        db`UPDATE tasks SET sequence = ${task.newSequence} WHERE id = ${task.id}`,
      );
  }

  await Promise.all(promises);
}

export async function deleteTask(taskId: string) {
  await db`DELETE FROM tasks WHERE id = ${taskId}`;

  revalidateTag("columns-with-tasks");
}
