"use server";

import { getUserElseRedirectToLogin } from "@/data/get-user-else-redirect-to-login";
import { TSubtask } from "@/data/types";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function addNewTask(
  columnId: string,
  sequence: number,
  formData: FormData,
) {
  getUserElseRedirectToLogin();

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

export async function updateTask(
  taskId: string,
  serverSubtasks: TSubtask[],
  formData: FormData,
) {
  console.log(taskId, serverSubtasks, [...formData.entries()]);
  const taskDetails = {
    name: formData.get("name")?.toString().trim(),
    description: formData.get("description")?.toString().trim(),
  };
  const subtasks = Array.from(formData.entries()).filter(([key]) =>
    key.startsWith("subtask"),
  );
  const oldSubtaskcount = subtasks.reduce(
    (acc, [key]) => (!key.split("^")[2].startsWith("new") ? acc + 1 : acc),
    0,
  );

  const changedFields: (keyof typeof taskDetails)[] = [];
  if (taskDetails.name) changedFields.push("name");
  if (taskDetails.description) changedFields.push("description");

  await db`UPDATE tasks SET ${db(taskDetails, changedFields)} WHERE id = ${taskId}`;

  subtasks.forEach(async ([key, value], index) => {
    if (key.split("^")[2].startsWith("new") && value.toString().trim()) {
      await db`INSERT INTO subtasks (task_id, name, sequence) VALUES (${taskId}, ${value as string}, ${oldSubtaskcount + index})`;
    } else {
      await db`UPDATE subtasks SET name = ${value as string}, sequence = ${index} WHERE id = ${key.split("^")[2]}`;
    }
  });

  serverSubtasks.forEach(async (sst) => {
    if (!subtasks.find((st) => st[0].split("^")[2] === sst.id)) {
      console.log("deleting", sst.id);
      await db`DELETE FROM subtasks WHERE id = ${sst.id}`;
    }
  });

  revalidateTag("columns-with-tasks");
}
