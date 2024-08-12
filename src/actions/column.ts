"use server";

import { getUserElseRedirectToLogin } from "@/data/get-user-else-redirect-to-login";
import { NewTask, TColumn, TTask } from "@/data/types";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewColumn(
  boardId: string,
  sequence: number,
  formData: FormData,
) {
  const name = (formData.get("name") as string).trim();

  const columns =
    await db`INSERT INTO columns (board_id, name, sequence) VALUES (${boardId}, ${name}, ${sequence}) RETURNING id`;

  const columnId = columns[0].id;

  const tasks = [] as NewTask[];

  Array.from(formData.entries()).forEach(([key, value], idx) => {
    const trimmedValue = value.toString().trim();
    if (key.startsWith("task") && trimmedValue)
      tasks.push({
        column_id: columnId,
        name: trimmedValue as string,
        sequence: +key.split("-")[1],
      });
  });

  if (tasks.length) {
    await db`
    INSERT INTO tasks ${db(tasks, "column_id", "name", "sequence")} 
  `;
  }

  revalidateTag("columns-with-tasks");
}

export async function deleteColumn(columnId: string) {
  getUserElseRedirectToLogin();

  try {
    await db`DELETE FROM columns WHERE id = ${columnId}`;

    revalidateTag("columns-with-tasks");
  } catch (e) {
    console.log(e);
  }
}
